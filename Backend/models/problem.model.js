import { Schema } from "mongoose";

const problemSchema = new Schema(
  {
    problemDescription: {
      type: String,
      required: true,
    },
    problemName: {
      type: String,
      required: true,
      unique: true,
    },
    problemDifficulty: {
      type: String,
      required: true,
      enum: ["easy", "medium", "hard"],
    },
    problemTestCases: [
      {
        input: {
          type: String,
          required: true,
        },
        expectedOutput: {
          type: String,
          required: true,
        },
      },
    ],
    problemRanking: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
