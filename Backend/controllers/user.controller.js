import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Match } from "../models/match.model.js";
import { Discuss } from "../models/discuss.model.js";
import { Problem } from "../models/problem.model.js";
import { mcqRoom } from "../models/mcqRoom.models.js";
import { Question } from "../models/mcq.model.js";
import uploadToCloudinary from "../Utils/cloudinary.js";
import { Room } from "../models/room.model.js";

const dashboardController = async (req, res, next) => {
  try {
    const { username } = req.query;
    if (!username) {
      throw new ApiError(404, "User Not Found in the request parameters");
    }

    const userData = await User.findOne({ username }).populate("ratingHistory");
    if (!userData) {
      throw new ApiError(404, "User Not Found");
    }

    console.log(userData)

    const recentMatches = await Room.find({
      "participants.userId": userData._id,
    })
      .sort({ date: -1 })
      .limit(10); 


    const formattedRatings = userData.ratingHistory?.ratings || [];

    const formattedMatches = recentMatches.map((match) => {
      const userResult = match.participants.find(
        (r) => r.userId.toString() === userData._id.toString()
      );

      return {
        style: match.style,
        participants: match.participants.length,
        outcome: userResult?.outcome || "N/A",
        xpGained: userResult?.ratingChange || 0,
        date: match.date,
      };
    });

    const playstyle = await Room.aggregate([
      {
        $match: {
          "participants.userId": userData._id,
        },
      },
      {
        $group: {
          _id: "$style",
          countPlayStyle: { $sum: 1 },
        },
      },
      { $sort: { countPlayStyle: -1 } },
      { $limit: 1 },
    ]);

    res.status(200).json(
      new ApiResponse(200, "User Fetched !", {
        userid: userData._id,
        username: userData.username,
        title: userData.title,
        level: userData.level,
        xp: userData.xp,
        totalXp: userData.totalXp,
        currentRating: userData.currentRating,
        profileImage: userData.profilePicture,
        rank: userData.rank,
        totalBattles: userData.totalBattles,
        totalWin: userData.totalWins,
        winRatio: userData.totalBattles
          ? userData.totalWins / userData.totalBattles
          : 0,
        winStreak: userData.winStreak,
        maximumRatings: userData.highestRating,
        playstyle: playstyle[0]?._id || "N/A", // most played style
        recentMatches: formattedMatches,
        ratingHistory: formattedRatings,
      })
    );
  } catch (error) {
    next(error);
  }
};

const updateUserName = async (req, res, next) => {
  try {
    const { newUsername, username } = req.body;

    if (!newUsername || !username) {
      throw new ApiError(400, "Not sufficient information in the request body");
    }

    const usernameAlreadyInUse = await User.findOne({ username: newUsername });
    if (usernameAlreadyInUse) {
      return res
        .status(200)
        .json("Username already in use", { message: "Username already in use" });
    }

    const currentUserDetails = await User.findOneAndUpdate(
      { username: username },
      { $set: { username: newUsername } },
      { new: true }
    );

    if (!currentUserDetails) {
      throw new ApiError(404, "User not found");
    }

    res.status(200).json(
      new ApiResponse(200, "Username Updated", {
        username: currentUserDetails.username,
      })
    );
  } catch (error) {
    next(error);
  }
};


const UpdateUserProfilePicture = async (req, res, next) => {

  console.log("insidde the unage updation conteoller")
  try {
    const { username } = req.body;
    if (!username) {
      throw new ApiError(404, "User Not Found");
    }

    const profilePhotoLocalPath = req.file?.path;
    if (!profilePhotoLocalPath) {
      throw new ApiError(404, "profile image not found");
    }

    const profilePhotoUpdatedURL = await uploadToCloudinary(
      profilePhotoLocalPath
    );
    if (!profilePhotoUpdatedURL) {
      throw new ApiError(
        500,
        "There was an error while uploading the profile photo please try again later"
      );
    }

    const currentUser = await User.findOneAndUpdate(
      { username },
      {
        profilePicture: profilePhotoUpdatedURL,
      },
      {
        new: true,
      }
    );

    if (!currentUser) {
      throw new ApiError(404, "User Not Found");
    }

    console.log("Profile photo updated successfully");

    res.status(200).json(
      new ApiResponse(200, "Profile photo updated successfully", {
        profilePicture: currentUser.profilePicture,
      })
    );
  } catch (error) {
    next(error);
  }
};

const leaderboardStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalBattleFought = await Match.countDocuments();
    const top10 = await User.aggregate([
      { $sort: { currentRating: -1 } },
      { $limit: 10 },
      {
        $project: {
          level: 1,
          username: 1,
          currentRating: 1,
          title: 1,
          totalWins: 1,
          profilePicture: 1,
        },
      },
    ]);

    res.status(200).json(
      new ApiResponse(200, "LeaderBoard data fetched successfully! ", {
        totalUsers,
        totalBattleFought,
        top10,
      })
    );
  } catch (error) {
    next(error);
  }
};

const discussionDataFetcher = async (_, res, next) => {
  try {
    const discussionData = await Discuss.find({})
      .populate({
        path: "user",
        select: "username profilePicture level",
      })
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json(
      new ApiResponse(200, "Data Fetched Successfully", {
        discussionData,
      })
    );
  } catch (error) {
    next(error);
  }
};

const discussionDataUpation = async (req, res) => {
  const { post, username } = req.body;
  
  if(!post || !username) {
    throw new ApiError (404, "Post details not found in the request body");
  }

  const authorOfThePost = await User.findOne({username: username});

  if(!authorOfThePost) {
    throw new ApiError(404, "user not found");
  }

  const postDetails = {
    user: authorOfThePost._id,
    message: post,
    reply: {

    }
  };
  const createNewPost = await Discuss.create(postDetails)
  if(!createNewPost) {
    throw new ApiError (500, "internal server error while creating the post");
  }

  res.status(200).json(
    new ApiResponse(200, "Added the post successfully")
  )
}

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

const CreateRoom = async (req, res) => {
  try {
    const { roomCode, username, style } = req.body;

    if (!roomCode || !username || !style) {
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
    const { roomCode, time, questions} = req.body;

    if(!roomCode) {
      throw new ApiError(200, "roomId not found in the request body");
    }

    const updatingBody = {};
    if(time) {
      updatingBody.startTime  = Date.now();
      updatingBody.endTime = Date.now() + time * 1000 + 120; // For Safety 
    }

    if(questions?.length > 0) {
      updatingBody.question = questions
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

    console.log("inside fetch Controller")
    const {roomid} = req.query;
    console.log("got the room id")

    if(!roomid) {
      throw new ApiError(404, "roomid not found in the request parameters");
    }

    console.log("finding the room with room id")
    const roomParticipantDetails = await Room.findOne({roomCode:roomid});

    if(!roomParticipantDetails) {
      throw new ApiError(500, "there was an error while fetchig the room details")
    }

    res.status(200).json(new ApiResponse(200, "participants list fetched successfully", {
      participants: roomParticipantDetails.participants
    }))
  } catch (error) {
    console.log("There is an unexpected error ", error);
    throw new ApiError(500, "internal server error");
  }
}

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


//     ****************      MCQ ROOMS CONTROLLER        ********************       //
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

    console.log(startTime, endTime)

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
        $match: { topic: topic.toUpperCase() },
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

  console.log(roomid)
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

    const userDetails = await User.findOne({ username: participantUsername });

    console.log(
      participantScore,
      participantTimeTaken,
      participantUsername,
      roomCode
    );

    // Add roomCode to required fields check
    // if (
    //   !participantScore ||
    //   !participantUsername ||
    //   !participantTimeTaken ||
    //   !roomCode
    // ) {
    //   throw new ApiError(404, "Required data not found in the request body");
    // }

    console.log("Findinf the room");

    const roomDetails = await mcqRoom.findOneAndUpdate(
      { roomCode },
      {
        $push: {
          participants: {
            userId: userDetails._id,
            username: participantUsername,
            score: participantScore,
            timeTaken: participantTimeTaken,
          },
        },
      },
      { new: true }
    );

    console.log("Goind trhe room");

    if (!roomDetails) {
      throw new ApiError(500, "Room not found or internal server error");
    }

    console.log("Room Details Updated:", roomDetails);

    roomDetails.participants.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.timeTaken - b.timeTaken;
    });

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
  dashboardController,
  updateUserName,
  UpdateUserProfilePicture,
  leaderboardStats,
  discussionDataFetcher,
  QuestionFetcher,
  mcqQuestionFetcher,
  CreateRoom,
  findMcqQuestionsFromBackend,
  findQuestionFromBackend,
  joinRoomHandler,
  updateRoomDetails,
  createMcqRoom,
  mcqRoomJoiningHandler,
  updateMcqRoomDetails,
  discussionDataUpation,
  updateRoomParticipantsDetails,
  fetchParticipants,
  updateMcqRoomParticipantDetails,
  fetchmcqParticipants,
};
