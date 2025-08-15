import mongoose, { model, Schema } from "mongoose" 

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profilePicture: {
      type: String,
    },
    totalBattles: {
      type: Number,
      default: 0,
    },
    totalWins: {
      type: Number,
      default: 0,
    },
    level: {
      type: Number,
      default: 1,
    },
    rank: {
      type: String,
      enum: ["Bronze", "Silver", "Gold", "Platinum", "Diamond"],
      default: "Bronze",
    },
    xp: {
      type: Number,
      default: 0,
    },
    winStreak: {
      type: Number,
      default: 0,
    },
    currentRating: {
      type: Number,
      default: 0,
    },
    highestRating: {
      type: Number,
      default: 0,
    },
    matches: [{
      type: Schema.Types.ObjectId,
      ref: "Match",
    }],
    ratingHistory: [{
      type: Schema.Types.ObjectId,      
      ref: "Ranking",
    }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);