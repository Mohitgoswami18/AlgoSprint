import cron from "node-cron";
import { Room } from "../models/room.model.js";
import { User } from "../models/user.model.js";
import { Ranking } from "../models/ranking.model.js";

// Helper function: calculates rating change
const calculateRatingChange = (outcome, position, totalParticipants) => {
  if (outcome === "WIN") {
    return Math.max(10, 100 - (position - 1) * 10);
  } else {
    const lossMultiplier = Math.min(
      10,
      position - Math.ceil(totalParticipants / 2)
    );
    return -Math.max(10, 20 * lossMultiplier);
  }
};

// Cron Job: runs every 2 hours
cron.schedule("0 */2 * * *", async () => {
  console.log("Cron Job Started: Updating room progress", new Date());

  try {
    const currentTime = new Date();

    // Find rooms that ended but are still pending
    const expiredRooms = await Room.find({
      endTime: { $lt: currentTime },
      matchStatus: "pending",
    });

    for (const room of expiredRooms) {
      console.log("Processing room:", room.roomCode);

      // Get finished participants and sort by score/timeTaken
      const finishedParticipants = room.participants
        .filter((p) => p.finished)
        .sort((a, b) => b.score - a.score || a.timeTaken - b.timeTaken);

      const totalFinished = finishedParticipants.length;

      for (const [index, participant] of finishedParticipants.entries()) {
        const position = index + 1;
        const outcome =
          position <= Math.max(1, Math.ceil(totalFinished / 2))
            ? "WIN"
            : "LOSE";

        participant.outcome = outcome;
        participant.ratingChange = calculateRatingChange(
          outcome,
          position,
          totalFinished
        );
        participant.updated = true;
        participant.position = position;

        // Update actual user in DB
        const user = await User.findOne({ username: participant.username });
        if (!user) continue;

        user.totalBattles += 1;

        if (outcome === "WIN") {
          user.totalWins += 1;
          user.winStreak += 1;
          user.xp += 15;
          user.currentRating += Math.floor(100 / position);
        } else {
          user.winStreak = 0;
          user.xp += 5;
          user.currentRating -= Math.floor(position * 10);
          if (user.currentRating < 0) user.currentRating = 0;
        }

        if(user.currentRating >=0 && user.currentRating <= 100) {
          user.rank = "Bronze"
        } else if (user.currentRating >= 100 && user.currentRating <= 300) {
          user.rank = "Silver";
        } else if (user.currentRating >= 300 && user.currentRating <= 500) {
          user.rank = "Gold";
        } else if (user.currentRating >= 500 && user.currentRating <= 1000) {
          user.rank = "Platinum";
        } else if (user.currentRating >= 1000 && user.currentRating <= 1500) {
          user.rank = "Diamond";
        } else if (user.currentRating >= 1500 && user.currentRating <= 2000) {
          user.rank = "Ace";
        } else if (user.currentRating >= 200) {
          user.rank = "Legend";
        }

          if (user.xp >= user.totalXp) {
            // Handle leveling
            user.level += 1;
            user.xp -= user.totalXp;
            user.totalXp += 50;
          }

        // Update highest rating
        if (user.currentRating > user.highestRating) {
          user.highestRating = user.currentRating;
        }

        // Update ranking history
        let rankHistory = await Ranking.findOne({ userId: user._id });
        if (!rankHistory) {
          rankHistory = await Ranking.create({
            userId: user._id,
            ratings: [{ value: user.currentRating, date: new Date() }],
          })
          
          user.ratingHistory = rankHistory._id;
        } else {
          rankHistory.ratings.push({
            value: user.currentRating,
            date: new Date(),
          });
          await rankHistory.save();
        }

        user.matches.push(room._id);
        await user.save();
      }

      room.matchStatus = "final";
      await room.save();
      console.log(`Room ${room.roomCode} updated successfully.`);
    }

    console.log("Cron Job Completed Successfully");
  } catch (err) {
    console.error("Error running cron job:", err);
  }
});
