import mongoose from "mongoose";

const mcqRoomSchema = new mongoose.Schema({
  roomCode: {
    type: String,
    required: true,
    unique: true,
  },
  topic: {type: String, required:true},
  question: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  matchStatus: {
    type: String,
    enum: ["pending", "final"],
    default: "pending",
  },
  startTime: {
    type: Date,
    default: null,
  },
  style: {
    type: String,
    required: true,
    default: "Rapidfire",
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
  date: { type: Date, default: Date.now() },
});

export const mcqRoom = mongoose.model("mcqRoom", mcqRoomSchema);
