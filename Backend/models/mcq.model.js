import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  answer: {
    type: Number,
    required: true,
  }, 
});

export default mongoose.model("Question", questionSchema);
