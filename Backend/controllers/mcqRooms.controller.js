import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { mcqRoom } from "../models/mcqRoom.models.js";
import { Question } from "../models/mcq.model.js";


const createMcqRoom = async (req, res) => {
  try {
    const { roomCode, username } = req.body;
    if (!roomCode || !username) {
      return res
        .status(200)
        .json(
          new ApiResponse(
            404,
            "not sufficient information provided in the req body"
          )
        );
    }

    const userData = await User.findOne({ username });
    if (!userData) {
      return res.status(200).json(new ApiResponse(404, "User not found"));
    }

    const userRoomDetail = {
      roomCode,
      participants: {
        userId: userData,
        username: username,
      },
    };

    const UpdatingToDatabase = await mcqRoom.create(userRoomDetail);
    if (!UpdatingToDatabase) {
      return res
        .status(200)
        .json(
          new ApiResponse(
            500,
            "There was an error while connecting to the database try again later"
          )
        );
    }

    return res
      .status(200)
      .json(new ApiResponse(200, "Room Created Successfully"));
  } catch (error) {
    console.log("Unexpected error occured ", error);
    return res.status(500).json(new ApiResponse(500, "Internal Server Error"));
  }
};

const mcqRoomJoiningHandler = async (req, res) => {
  try {
    const { roomCode, username } = req.body;

    if (!roomCode || !username) {
      return res
        .status(200)
        .json(
          new ApiResponse(404, "Not Found required data in the request body")
        );
    }

    const userData = await User.findOne({ username });
    if (!userData) {
      return res.status(200).json(new ApiResponse(404, " User not found"));
    }

    const UpdatingToDatabase = await mcqRoom.findOneAndUpdate(
      { roomCode },
      {
        $push: {
          participants: {
            userId: userData,
            username: username,
          },
        },
      },
      { new: true }
    );

    if (!UpdatingToDatabase) {
      return res
        .status(200)
        .json(new ApiResponse(500, "Internal server error"));
    }

    res.status(200).json({
      message: "Room joined successfully",
      room: UpdatingToDatabase,
    });
  } catch (error) {
    console.error("Unexpected error occurred", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateMcqRoomDetails = async (req, res) => {
  try {
    if (!req.body) {
      console.log("no body");
    }
    console.log("inside the updateController");
    const { roomCode, questions, startTime, endTime } = req.body;

    console.log("fdsf");
    if (!roomCode || !questions) {
      throw new ApiError(404, "Required data not found in the request body");
    }

    console.log(startTime, endTime);

    const roomDetails = await mcqRoom.findOneAndUpdate(
      { roomCode },
      {
        $set: {
          question: questions,
          startTime: Date.now(),
          endTime: Date.now() + 1200000,
        },
      },
      { new: true }
    );

    if (!roomDetails) {
      throw new ApiError(500, "internal server Error");
    }

    res
      .status(200)
      .json(new ApiResponse(200, "Successfully updated room Details"));
  } catch (error) {
    console.log("an unexpected Error occured", error);
  }
};

const mcqQuestionFetcher = async (req, res) => {
  console.log("INside the mcqFEtcher Controller");
  if (!req.params) {
    throw new ApiError(404, "url params not found in the request");
  }

  const { topic } = req.query;

  if (!topic) {
    throw new ApiError(404, "The topic not found");
  }

  console.log("Finding questions from database");
  console.log(topic);

  try {
    console.log("finding questions from the backend");
    const response = await Question.aggregate([
      {
        $match: { topic: topic.tpLowerCase() },
      },
      {
        $sample: { size: 20 },
      },
    ]);

    console.log(response);
    if (!response) {
      throw new ApiError(404, "Questions not found in the database");
    }

    res.status(200).json(
      new ApiResponse(200, "Questions Fetched Successfully form the database", {
        Questions: response,
      })
    );
  } catch (error) {
    console.log(
      "there was an unknown error while fetching the questions from the database"
    );
    throw new ApiError(500, "Internal server error ", error);
  }
};

const findMcqQuestionsFromBackend = async (req, res) => {
  const { roomid } = req.query;

  if (!roomid) {
    throw new ApiError(404, "Roomid not found in the request parameters");
  }

  console.log(roomid);
  console.log("got the room id");
  console.log("Entring the required controller");

  const response = await mcqRoom
    .findOne({ roomCode: roomid })
    .populate("question")
    .exec();
  if (!response) {
    throw new ApiError(404, "room not found or expired");
  }

  console.log("Found the room with id ROOMCODE");

  if (Date.now() > response.endTime) {
    throw new ApiError(200, "The room is expired");
  }

  res.status(200).json(
    new ApiResponse(200, "Questions fetched successfully", {
      questions: response.question,
    })
  );
};

const updateMcqRoomParticipantDetails = async (req, res) => {
  try {
    const {
      participantScore,
      participantUsername,
      participantTimeTaken,
      roomCode,
    } = req.body;

    const roomDetails = await mcqRoom.findOne({ roomCode });
    if (!roomDetails) {
      throw new ApiError(404, "Room not found");
    }

    const participantIndex = roomDetails.participants.findIndex(
      (p) => p.username === participantUsername
    );

    if (participantIndex === -1) {
      throw new ApiError(404, "Participant not found");
    }

    roomDetails.participants[participantIndex].score = participantScore;
    roomDetails.participants[participantIndex].timeTaken = participantTimeTaken;
    roomDetails.participants[participantIndex].finished = true;

    roomDetails.participants.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.timeTaken - b.timeTaken;
    });

    await roomDetails.save();

    console.log("Room Details Updated:", roomDetails);

    return res.status(200).json(
      new ApiResponse(200, "Successfully updated room details", {
        roomDetails,
      })
    );
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    return res.status(500).json(
      new ApiResponse(500, "Internal server error", {
        error: error.message,
      })
    );
  }
};

const fetchmcqParticipants = async (req, res) => {
  try {
    console.log("inside fetch Controller");
    const { roomid } = req.query;
    console.log("got the room id");

    if (!roomid) {
      throw new ApiError(404, "roomid not found in the request parameters");
    }

    console.log("finding the room with room id");
    const roomParticipantDetails = await mcqRoom.findOne({ roomCode: roomid });

    if (!roomParticipantDetails) {
      throw new ApiError(
        500,
        "there was an error while fetchig the room details"
      );
    }

    res.status(200).json(
      new ApiResponse(200, "participants list fetched successfully", {
        participants: roomParticipantDetails.participants,
      })
    );
  } catch (error) {
    console.log("There is an unexpected error ", error);
    throw new ApiError(500, "internal server error");
  }
};

export {
  createMcqRoom,
  mcqRoomJoiningHandler,
  updateMcqRoomDetails,
  mcqQuestionFetcher,
  findMcqQuestionsFromBackend,
  updateMcqRoomParticipantDetails,
  fetchmcqParticipants,
};