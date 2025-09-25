import ConnectToDatabase from "../Database/database.js";
import { Room } from "../models/room.model.js";

const userIds = [
  "68d4caf4b4614cb03ef71d1c",
  "68d4c846ea65901754d9ea42",
  "68d4c846ea65901754d9ea43",
  "68d4c846ea65901754d9ea44",
  "68d4c846ea65901754d9ea45",
  "68d4c846ea65901754d9ea46",
  "68d4c846ea65901754d9ea47",
  "68d4c846ea65901754d9ea48",
  "68d4c846ea65901754d9ea49",
  "68d4c846ea65901754d9ea4a",
  "68d4c846ea65901754d9ea4b",
  "68d4c846ea65901754d9ea4c",
];

const randomCode = () =>
  Math.random().toString(36).substring(2, 8).toUpperCase();

const sampleRoom = [
  {
    roomCode: randomCode(),
    question: [], // leave empty or link Problem IDs if you have them
    numberOfQuestions: 3,
    matchStatus: "final",
    style: "flash",
    startTime: new Date(),
    endTime: new Date(Date.now() + 1000 * 60 * 5),
    participants: [
      {
        userId: userIds[0],
        username: "mohit",
        score: 2,
        outcome: "WIN",
        timeTaken: "4m 12s",
        ratingChange: +25,
        updated: true,
        finished: true,
      },
      {
        userId: userIds[1],
        username: "muskan",
        score: 1,
        outcome: "LOSE",
        timeTaken: "4m 55s",
        ratingChange: -25,
        updated: true,
        finished: true,
      },
    ],
  },
  {
    roomCode: randomCode(),
    question: [],
    numberOfQuestions: 5,
    matchStatus: "final",
    style: "rapid",
    startTime: new Date(),
    endTime: new Date(Date.now() + 1000 * 60 * 15),
    participants: [
      {
        userId: userIds[2],
        username: "arjun",
        score: 1,
        outcome: "LOSE",
        timeTaken: "14m 05s",
        ratingChange: -15,
        updated: true,
        finished: true,
      },
      {
        userId: userIds[3],
        username: "sneha",
        score: 4,
        outcome: "WIN",
        timeTaken: "13m 12s",
        ratingChange: +15,
        updated: true,
        finished: true,
      },
    ],
  },
  {
    roomCode: randomCode(),
    question: [],
    numberOfQuestions: 10,
    matchStatus: "final",
    style: "classical",
    startTime: new Date(),
    endTime: new Date(Date.now() + 1000 * 60 * 60),
    participants: [
      {
        userId: userIds[6],
        username: "karan",
        score: 7,
        outcome: "WIN",
        timeTaken: "52m 34s",
        ratingChange: +30,
        updated: true,
        finished: true,
      },
      {
        userId: userIds[7],
        username: "priya",
        score: 3,
        outcome: "LOSE",
        timeTaken: "59m 44s",
        ratingChange: -30,
        updated: true,
        finished: true,
      },
    ],
  },
  {
    roomCode: randomCode(),
    question: [],
    numberOfQuestions: 5,
    matchStatus: "final",
    style: "flash",
    startTime: new Date(),
    endTime: new Date(Date.now() + 1000 * 60 * 7),
    participants: [
      {
        userId: userIds[9],
        username: "neha",
        score: 3,
        outcome: "WIN",
        timeTaken: "6m 25s",
        ratingChange: +20,
        updated: true,
        finished: true,
      },
      {
        userId: userIds[10],
        username: "rohit",
        score: 2,
        outcome: "LOSE",
        timeTaken: "7m 01s",
        ratingChange: -20,
        updated: true,
        finished: true,
      },
    ],
  },
  {
    roomCode: randomCode(),
    question: [],
    numberOfQuestions: 8,
    matchStatus: "final",
    style: "rapid",
    startTime: new Date(),
    endTime: new Date(Date.now() + 1000 * 60 * 20),
    participants: [
      {
        userId: userIds[4],
        username: "rahul",
        score: 5,
        outcome: "WIN",
        timeTaken: "18m 10s",
        ratingChange: +22,
        updated: true,
        finished: true,
      },
      {
        userId: userIds[5],
        username: "anjali",
        score: 3,
        outcome: "LOSE",
        timeTaken: "19m 15s",
        ratingChange: -22,
        updated: true,
        finished: true,
      },
    ],
  },
];

ConnectToDatabase();

const insertIntoDatabase = async () => {
  try {
    const inserted = await Room.insertMany(sampleRoom);
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
