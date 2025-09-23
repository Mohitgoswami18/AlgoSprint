import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  roomCode: {
    type: String,
    required: true,
    unique: true,
  },
  question: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
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
    enum: ["blitz", "rapid", "classical", "Rapidfire"],
  },
  startTime: {
    type: Date,
    default: null,
  },
  endTime: {
    type: Date,
    default: null,
  },
  participants: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      username: String,
      score: { type: Number, default: 0 },
      outcome: { type: String, enum: ["WIN", "LOSE"] },
      timeTaken: { type: String },
      ratingChange: { type: Number, default: 0 },
      updated: { type: Boolean, default: false },
      finished: { type: Boolean, default: false },
    },
  ],
  date: { type: Date, default: Date.now },
});

export const Room = mongoose.model("Room", roomSchema);
