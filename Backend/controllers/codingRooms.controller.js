import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Room } from "../models/room.model.js";
import { Problem } from "../models/problem.model.js";

const CreateRoom = async (req, res) => {
  try {
    
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json(new ApiResponse(401, "Authentication token missing"));
    }
    console.log(req.auth)
    const { roomCode, username, style, numberOfQuestions } = req.body;

    if (!roomCode || !username || !style || !numberOfQuestions) {
      return style
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
      numberOfQuestions,
      roomCode,
      participants: {
        userId: userData,
        username: username,
      },
      style,
    };

    const UpdatingToDatabase = await Room.create(userRoomDetail);
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

const QuestionFetcher = async (req, res) => {
  console.log("We are in the questionFetcher Controller");

  if (!req.params) {
    throw new ApiError(
      400,
      "Request body not found please provide a request body"
    );
  }

  const { questions } = req.query;
  console.log("Number of questions are :", questions);

  const numberofQuestions = parseInt(questions, 10);
  console.log(typeof numberofQuestions);

  if (!questions) {
    throw new ApiError(400, "Number of Questions are required");
  }

  try {
    console.log("Fetching questions from the database");
    const quesitonsData = await Problem.aggregate([
      { $sample: { size: numberofQuestions } },
    ]);

    if (!quesitonsData) {
      throw new ApiError(505, "error while Fetching the questions");
    } else {
      console.log("questions fetched successfully");
    }

    res.status(200).json(
      new ApiResponse(200, "data was fetched successfully", {
        questions: quesitonsData,
      })
    );
  } catch (err) {
    console.log("an error occured ", err);
  }
};

const joinRoomHandler = async (req, res) => {
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

    const UpdatingToDatabase = await Room.findOneAndUpdate(
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

const findQuestionFromBackend = async (req, res) => {
  const { roomid } = req.query;

  if (!roomid) {
    throw new ApiError(404, "Roomid not found in the request parameters");
  }

  console.log("got the room id");
  console.log("Entring the required controller");

  const response = await Room.findOne({ roomCode: roomid })
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

const updateRoomDetails = async (req, res) => {
  try {
    const { roomCode, time, questions } = req.body;

    if (!roomCode) {
      throw new ApiError(200, "roomId not found in the request body");
    }

    const updatingBody = {};
    if (time) {
      updatingBody.startTime = Date.now();
      updatingBody.endTime = Date.now() + time * 1000 + 120; // For Safety
    }

    if (questions?.length > 0) {
      updatingBody.question = questions;
    }

    const roomDetails = await Room.findOneAndUpdate(
      { roomCode },
      {
        $set: updatingBody,
      },
      { new: true }
    );

    if (!roomDetails) {
      throw new ApiError(500, "internal server Error");
    }

    console.log("The RoomDetails get Updated", roomDetails);

    res
      .status(200)
      .json(new ApiResponse(200, "Successfully updated room Details"));
  } catch (error) {
    console.log("an unexpected Error occured", error);
  }
};

const fetchParticipants = async (req, res) => {
  try {
    console.log("inside fetch Controller");
    const { roomid } = req.query;
    console.log("got the room id");

    if (!roomid) {
      throw new ApiError(404, "roomid not found in the request parameters");
    }

    console.log("finding the room with room id");
    const roomParticipantDetails = await Room.findOne({ roomCode: roomid });

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

const updateRoomParticipantsDetails = async (req, res) => {
  try {
    const {
      participantScore,
      participantUsername,
      participantTimeTaken,
      roomCode,
    } = req.body;

    const roomDetails = await Room.findOne({ roomCode });
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

const findRoomSetting = async (req, res) => {
  try {
    const { roomid } = req.query;
    if (!roomid) {
      throw new ApiError(404, "room id not found int he request parameters");
    }

    const currentRoom = await Room.findOne({ roomCode: roomid });
    if (!currentRoom) {
      throw new ApiError(404, "cant find a room with the gioven room id");
    }

    res.status(200).json(
      new ApiResponse(200, "fetched the room data successfully", {
        numberofQuestions: currentRoom.numberOfQuestions,
        style: currentRoom.style,
      })
    );
  } catch (error) {
    console.log("an error occured while finding the room details");
  }
};

export {
  CreateRoom,
  joinRoomHandler,
  QuestionFetcher,
  findQuestionFromBackend,
  updateRoomDetails,
  fetchParticipants,
  updateRoomParticipantsDetails,
  findRoomSetting,
};
