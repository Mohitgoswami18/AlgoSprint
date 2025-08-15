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
    enum: ["lightSpeed", "casual", "day", "rapid"],
  },
  opponentId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Match = mongoose.model("Match", MatchSchema);