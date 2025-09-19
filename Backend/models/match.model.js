import mongoose, { Schema } from "mongoose";

const matchSchema = new Schema({
  startTime: {
    type: Date,
    required,
  },
  duration: {
    type: String,
    required
  },
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
    default: "pending"
  },
  style: {
    type: String,
    required: true,
    enum: ["Blitz", "Rapid", "Classical"],
  },
  results: [
    {
      user: { type: Schema.Types.ObjectId, ref: "User", required: true },
      score: { type: Number, default: 0 },
      outcome: { type: String, enum: ["win", "loss", "draw"], required: true },
      ratingChange: { type: Number, default: 0 },
    },
  ],
  date: { type: Date, default: Date.now },
  updated: { type: Boolean, default: false },
});

export const Match = mongoose.model("Match", matchSchema);
