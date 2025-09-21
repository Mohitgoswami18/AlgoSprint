import mongoose, { Schema } from "mongoose";

const matchSchema = new Schema({
  startTime: { type: Date, required: true },
  duration: { type: String, required: true },

  matchIdentifier: {
    type: String,
    required: true,
    unique: true,
  },
  players: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  matchStatus: {
    type: String,
    enum: ["pending", "final"],
    default: "pending",
  },
  style: {
    type: String,
    required: true,
    enum: ["blitz", "rapid", "classical"],
  },
  results: [
    {
      user: { type: Schema.Types.ObjectId, ref: "User", required: true },
      score: { type: Number, default: 0 },
      outcome: { type: String, enum: ["WIN", "LOSE"], required: true },
      ratingChange: { type: Number, default: 0 },
      updated: { type: Boolean, default: false },
    },
  ],
  date: { type: Date, default: Date.now },
});

export const Match = mongoose.model("Match", matchSchema);
