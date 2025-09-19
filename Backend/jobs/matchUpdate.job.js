import cron from "node-cron";
import Match from "../models/Match.js";
import User from "../models/User.js";
import { ApiError } from "../Utils/ApiError.js";

// Run every minute to check for ended matches
cron.schedule("* * * * *", async () => {
  console.log("⏳ Checking matches to finalize...");

  try {
    const now = new Date();

    // Find matches that ended but are still not completed
    const matchesToFinalize = await Match.find({
      endTime: { $lte: now },
      status: "running",
    });

    for (const match of matchesToFinalize) {
      console.log(`⚡ Finalizing match ${match.matchIdentifier}`);

      for (const player of match.results) {
        const userDetails = await User.findOne({ _id:player.user });

        if (!userDetails) {
          throw new ApiError(404, "user not found");
        }

        userDetails.totalBattles = userDetails.totalBattles + 1;
         const normalizedResult = result.toUpperCase();
         if (normalizedResult === "WIN") {
           userDetails.xp += 15;
           if (userDetails.xp >= userDetails.totalXp) {
             userDetails.level += 1;
             userDetails.xp = userDetails.xp - userDetails.totalXp;
             userDetails.totalXp += 50;
           }
           userDetails.totalWins = userDetails.totalWins + 1;
           userDetails.winStreak = userDetails.winStreak + 1;
           userDetails.currentRating += Math.floor(100 / position);
           if (userDetails.currentRating > userDetails.highestRating) {
             userDetails.highestRating = userDetails.currentRating;
           }
         } else if (normalizedResult === "LOSE") {
           userDetails.winStreak = 0;
           userDetails.xp += 5;
           if (userDetails.xp >= userDetails.totalXp) {
             userDetails.level += 1;
             userDetails.xp = userDetails.xp - userDetails.totalXp;
             userDetails.totalXp += 50;
           }
           userDetails.currentRating -= Math.floor(position * 10);
           if (userDetails.currentRating < 0) {
             userDetails.currentRating = 0;
           }
         } else {
           throw new ApiError(
             404,
             "invalid match result passed to the request body"
           );
         }

         const currentRatingOfUser = userDetails.currentRating;
         let userRank;

         if (currentRatingOfUser === 0) {
           userRank = "unRanked";
         } else if (currentRatingOfUser > 0 && currentRatingOfUser <= 100) {
           userRank = "Bronze";
         } else if (currentRatingOfUser > 100 && currentRatingOfUser <= 300) {
           userRank = "Silver";
         } else if (currentRatingOfUser > 300 && currentRatingOfUser <= 500) {
           userRank = "Gold";
         } else if (currentRatingOfUser > 500 && currentRatingOfUser <= 1000) {
           userRank = "Platinum";
         } else if (currentRatingOfUser > 1000 && currentRatingOfUser <= 1500) {
           userRank = "Diamond";
         } else if (currentRatingOfUser > 1500 && currentRatingOfUser <= 2000) {
           userRank = "Ace";
         } else {
           userRank = "Legend";
         }

         userDetails.rank = userRank;
         await userDetails.save();

        let playerRankDetails = await Ranking.findOne({ userId: userDetails._id });
        
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

          
        const { userId, score, xpEarned, ratingChange } = player;

        // Update each user
        await User.findByIdAndUpdate(
          userId,
          {
            $inc: {
              xp: xpEarned,
              rating: ratingChange,
              totalScore: score,
            },
            $push: {
              ratingHistory: { date: new Date(), value: ratingChange },
              matchHistory: {
                matchId: match._id,
                score,
                xpEarned,
                ratingChange,
              },
            },
          },
          { new: true }
        );
      }

      // Mark match as completed so it doesn’t run again
      match.status = "completed";
      await match.save();
    }
  } catch (err) {
    console.error("❌ Error finalizing matches:", err);
  }
});
