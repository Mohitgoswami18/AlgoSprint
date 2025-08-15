import { Schema } from "mongoose";

const ratingSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    ratings: [
      {
        value: { type: Number, required: true },
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const Ranking = mongoose.model("Ranking", ratingSchema);