import mongoose from "mongoose";

const mcqRoomSchema = new mongoose.Schema({
  roomCode: {
    type: String,
    required: true,
    unique: true,
  },
  question: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
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
      timeTaken: { type: String },
    },
  ],
});

export const mcqRoom = mongoose.model("mcqRoom", mcqRoomSchema);
