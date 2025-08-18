import { Schema } from "mongoose";

const MatchSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  style: {
    type: String,
    required: true,
    enum: ["Blitz", "rapid", "classical"],
  },
  opponentId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Match = mongoose.model("Match", MatchSchema);