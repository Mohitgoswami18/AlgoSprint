import mongoose, { Schema } from "mongoose";

const matchSchema = new Schema({
  players: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
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
});

export const Match = mongoose.model("Match", matchSchema);
