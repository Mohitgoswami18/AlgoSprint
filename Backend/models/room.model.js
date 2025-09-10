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
      submissions: [
        {
          code: String,
          language: String,
          status: String,
          submittedAt: { type: Date, default: Date.now },
        },
      ],
    },
  ],
});

export const Room = mongoose.model("Room", roomSchema)
