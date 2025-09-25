import { Discuss } from "../models/discuss.model.js";
import ConnectToDatabase from "../Database/database.js";

const discussionSeed = [
  {
    user: "64f1a2c9e4b0d9a1a1234567",
    message: "What do you guys think about learning MERN stack as a beginner?",
    reply: [
      {
        user: "64f1a2c9e4b0d9a1a7654321",
        message: "It’s a solid choice, backend and frontend together!",
      },
      {
        user: "64f1a2c9e4b0d9a1a9876543",
        message: "Yes, start with basics of JavaScript first.",
      },
    ],
  },
  {
    user: "64f1a2c9e4b0d9a1a1234568",
    message: "Does anyone know a good resource for DSA in C++?",
    reply: [
      {
        user: "64f1a2c9e4b0d9a1a7654322",
        message: "You can try Code360 or LeetCode, both are great!",
      },
    ],
  },
  {
    user: "64f1a2c9e4b0d9a1a1234569",
    message: "How do I start contributing to open source?",
    reply: [
      {
        user: "64f1a2c9e4b0d9a1a7654323",
        message:
          "Pick a beginner-friendly repo and check issues labeled 'good first issue'.",
      },
      {
        user: "64f1a2c9e4b0d9a1a7654324",
        message: "Learn git and GitHub basics first!",
      },
    ],
  },
  {
    user: "64f1a2c9e4b0d9a1a1234570",
    message:
      "What’s the difference between supervised and unsupervised learning?",
    reply: [
      {
        user: "64f1a2c9e4b0d9a1a7654325",
        message: "Supervised uses labeled data, unsupervised doesn’t.",
      },
    ],
  },
  {
    user: "64f1a2c9e4b0d9a1a1234571",
    message: "Can someone explain closures in JavaScript?",
    reply: [
      {
        user: "64f1a2c9e4b0d9a1a7654326",
        message:
          "A closure is when a function remembers variables from its outer scope.",
      },
    ],
  },
  {
    user: "64f1a2c9e4b0d9a1a1234572",
    message: "Best way to practice SQL queries?",
    reply: [
      {
        user: "64f1a2c9e4b0d9a1a7654327",
        message: "LeetCode database section has good SQL problems.",
      },
      {
        user: "64f1a2c9e4b0d9a1a7654328",
        message: "Try to build a small project with SQLite/MySQL.",
      },
    ],
  },
  {
    user: "64f1a2c9e4b0d9a1a1234573",
    message: "What is the difference between REST and GraphQL?",
    reply: [
      {
        user: "64f1a2c9e4b0d9a1a7654329",
        message:
          "REST has fixed endpoints, GraphQL lets you query exactly what you need.",
      },
    ],
  },
  {
    user: "64f1a2c9e4b0d9a1a1234574",
    message: "Any tips for time management while coding?",
    reply: [
      {
        user: "64f1a2c9e4b0d9a1a7654330",
        message: "Try the Pomodoro technique, it works well.",
      },
    ],
  },
  {
    user: "64f1a2c9e4b0d9a1a1234575",
    message: "What is a monorepo?",
    reply: [
      {
        user: "64f1a2c9e4b0d9a1a7654331",
        message:
          "It’s a repo where multiple projects are kept together instead of separate repos.",
      },
    ],
  },
  {
    user: "64f1a2c9e4b0d9a1a1234576",
    message: "How to deploy a Node.js app for free?",
    reply: [
      {
        user: "64f1a2c9e4b0d9a1a7654332",
        message: "You can try Render, Railway, or Vercel.",
      },
    ],
  },
];



ConnectToDatabase();

const insertIntoDatabase = async () => {
  try {
    const inserted = await Discuss.insertMany(discussionSeed);
    if (inserted) {
      console.log(
        "the data have been seccessfully pushed inside the mongo db database"
      );
    } else {
      console.log("There was an error while inserting the data into database");
    }
  } catch (error) {
    console.log(error);
  }
};

insertIntoDatabase();