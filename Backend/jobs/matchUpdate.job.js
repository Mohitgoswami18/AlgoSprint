import cron from "node-cron";
import {Match} from "../models/match.model.js";
import {User} from "../models/user.model.js";
import {Ranking} from "../models/ranking.model.js";

cron.schedule("* * * * *", async () => {
  console.log("⏳ Checking matches to finalize...");

  try {
    const now = new Date();

    const matchesToFinalize = await Match.find({
      endTime: { $lte: now },
      matchStatus: "pending",
    });

    for (const match of matchesToFinalize) {
      console.log(`⚡ Finalizing match ${match.matchIdentifier}`);

      for (const player of match.results) {
        if (player.updated) continue; // already processed

        const userDetails = await User.findById(player.user);
        if (!userDetails) {
          console.error(`❌ User not found: ${player.user}`);
          continue;
        }

        userDetails.totalBattles += 1;

        const normalizedResult = player.outcome.toUpperCase();

        if (normalizedResult === "WIN") {
          userDetails.xp += 15;
          if (userDetails.xp >= userDetails.totalXp) {
            userDetails.level += 1;
            userDetails.xp -= userDetails.totalXp;
            userDetails.totalXp += 50;
          }
          userDetails.totalWins += 1;
          userDetails.winStreak += 1;
          userDetails.currentRating += player.ratingChange;
          if (userDetails.currentRating > userDetails.highestRating) {
            userDetails.highestRating = userDetails.currentRating;
          }
        } else if (normalizedResult === "LOSS") {
          userDetails.winStreak = 0;
          userDetails.xp += 5;
          if (userDetails.xp >= userDetails.totalXp) {
            userDetails.level += 1;
            userDetails.xp -= userDetails.totalXp;
            userDetails.totalXp += 50;
          }
          userDetails.currentRating += player.ratingChange; // already negative
          if (userDetails.currentRating < 0) {
            userDetails.currentRating = 0;
          }
        }

        const currentRatingOfUser = userDetails.currentRating;
        if (currentRatingOfUser === 0) userDetails.rank = "unRanked";
        else if (currentRatingOfUser <= 100) userDetails.rank = "Bronze";
        else if (currentRatingOfUser <= 300) userDetails.rank = "Silver";
        else if (currentRatingOfUser <= 500) userDetails.rank = "Gold";
        else if (currentRatingOfUser <= 1000) userDetails.rank = "Platinum";
        else if (currentRatingOfUser <= 1500) userDetails.rank = "Diamond";
        else if (currentRatingOfUser <= 2000) userDetails.rank = "Ace";
        else userDetails.rank = "Legend";

        await userDetails.save();

        let playerRankDetails = await Ranking.findOne({
          userId: userDetails._id,
        });
        if (!playerRankDetails) {
          playerRankDetails = await Ranking.create({
            userId: userDetails._id,
            ratings: [{ value: userDetails.currentRating, date: new Date() }],
          });
        } else {
          playerRankDetails.ratings.push({
            value: userDetails.currentRating,
            date: new Date(),
          });
          await playerRankDetails.save();
        }

        player.updated = true;
      }

      match.matchStatus = "final";
      await match.save();
    }
  } catch (err) {
    console.error("❌ Error finalizing matches:", err);
  }
});
