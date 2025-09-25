import ConnectToDatabase from "../Database/database.js";
import { mcqRoom } from "../models/mcqRoom.models.js";

const sampleRoom = [
    {
      roomCode: "MCQ12345",
      question: [],
      matchStatus: "final",
      participants: [
        {
          userId: "68d4caf4b4614cb03ef71d1c",
          username: "player1",
          score: 8,
          outcome: "WIN",
          timeTaken: "2m 30s",
          ratingChange: 20,
          updated: true,
          finished: true,
        },
        {
          userId: "68d4c846ea65901754d9ea42",
          username: "player2",
          score: 6,
          outcome: "LOSE",
          timeTaken: "3m 10s",
          ratingChange: -10,
          updated: true,
          finished: true,
        },
      ],
    },
    {
      roomCode: "MCQ56789",
      question: [],
      matchStatus: "final",
      participants: [
        {
          userId: "68d4c846ea65901754d9ea43",
          username: "player3",
          score: 7,
          outcome: "WIN",
          timeTaken: "2m 45s",
          ratingChange: 15,
          updated: true,
          finished: true,
        },
        {
          userId: "68d4c846ea65901754d9ea44",
          username: "player4",
          score: 5,
          outcome: "LOSE",
          timeTaken: "3m 20s",
          ratingChange: -8,
          updated: true,
          finished: true,
        },
        {
          userId: "68d4c846ea65901754d9ea45",
          username: "player5",
          score: 4,
          outcome: "LOSE",
          timeTaken: "3m 30s",
          ratingChange: -5,
          updated: true,
          finished: true,
        },
      ],
    },
    {
      roomCode: "MCQ24680",
      question: [],
      matchStatus: "final",
      participants: [
        {
          userId: "68d4c846ea65901754d9ea46",
          username: "player6",
          score: 9,
          outcome: "WIN",
          timeTaken: "2m 10s",
          ratingChange: 25,
          updated: true,
          finished: true,
        },
        {
          userId: "68d4c846ea65901754d9ea47",
          username: "player7",
          score: 7,
          outcome: "LOSE",
          timeTaken: "2m 50s",
          ratingChange: -12,
          updated: true,
          finished: true,
        },
      ],
    },
    {
      roomCode: "MCQ13579",
      question: [],
      matchStatus: "final",
      participants: [
        {
          userId: "68d4c846ea65901754d9ea48",
          username: "player8",
          score: 6,
          outcome: "LOSE",
          timeTaken: "3m 00s",
          ratingChange: -10,
          updated: true,
          finished: true,
        },
        {
          userId: "68d4c846ea65901754d9ea49",
          username: "player9",
          score: 8,
          outcome: "WIN",
          timeTaken: "2m 40s",
          ratingChange: 18,
          updated: true,
          finished: true,
        },
      ],
    },
    {
      roomCode: "MCQ97531",
      question: [],
      matchStatus: "final",
      participants: [
        {
          userId: "68d4c846ea65901754d9ea4a",
          username: "player10",
          score: 5,
          outcome: "LOSE",
          timeTaken: "3m 15s",
          ratingChange: -7,
          updated: true,
          finished: true,
        },
        {
          userId: "68d4c846ea65901754d9ea4b",
          username: "player11",
          score: 9,
          outcome: "WIN",
          timeTaken: "2m 20s",
          ratingChange: 22,
          updated: true,
          finished: true,
        },
        {
          userId: "68d4c846ea65901754d9ea4c",
          username: "player12",
          score: 4,
          outcome: "LOSE",
          timeTaken: "3m 25s",
          ratingChange: -6,
          updated: true,
          finished: true,
        },
      ],
    },
];

ConnectToDatabase();

const insertIntoDatabase = async () => {
  try {
    const inserted = await mcqRoom.insertMany(sampleRoom);
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
