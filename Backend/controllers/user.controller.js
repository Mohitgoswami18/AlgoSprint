import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Match } from "../models/match.model.js";
import { Discuss } from "../models/discuss.model.js";
import { Problem } from "../models/problem.model.js";
import { Ranking } from "../models/ranking.model.js";
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

    const userData = await User.findOne({ username })
      .populate({
        path: "ratingHistory",
        select: "date value -_id",
        options: { sort: { createdAt: 1 } },
      })
      .populate({
        path: "matches",
        select: "style results players date",
        options: { sort: { date: -1 } },
      });
    if (!userData) {
      throw new ApiError(404, "User Not Found");
    }

    const formattedMatches = userData.matches.map((match) => {
      const userResult = match.results.find(
        (r) => r.user.toString() === userData._id.toString()
      );

      return {
        style: match.style,
        participants: match.players.length - 1,
        outcome: userResult?.outcome || "N/A",
        xpGained: userResult?.ratingChange || 0,
        date: match.date,
      };
    });

    const playstyle = await Match.aggregate([
      {
        $match: {
          players: userData._id, 
        },
      },
      {
        $group: {
          _id: "$style",
          countPlayStyle: { $sum: 1 }, 
        },
      },
      {
        $sort: { countPlayStyle: -1 },
      },
      {
        $limit: 1,
      },
    ]);


    res.status(200).json(
      new ApiResponse(200, "User Fetched !", {
        username: userData.username,
        title: userData.title,
        level: userData.level,
        xp: userData.xp,
        profileImage: userData.profilePicture,
        ranking: userData.ratingHistory,
        totalBattles: userData.totalBattles,
        totalWin: userData.totalWins,
        winRatio: userData.totalBattles
          ? userData.totalWins / userData.totalBattles
          : 0,
        winStreak: userData.winStreak,
        maximumRatings: userData.highestRating,
        playstyle: playstyle,
        recentMatches: formattedMatches,
      })
    );
  } catch (error) {
    next(error);
  }
};

const updateUserName = async (req, res, next) => {
  try {
    const { userId } = req.auth;
    const { newUsername } = req.body;
    const currentUserDetails = await User.findOneAndUpdate(
      { clerkId: userId },
      {
        $set: {
          username: newUsername,
        },
      },
      {
        new: true,
      }
    );

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
  try {
    const { username } = req.params;
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
    const discussionData = await Discuss.aggregate([
      {
        $sort: {
          createdAt: -1,
        },
      },
      { $limit: 20 },
    ]);

    res.status(200).json(
      new ApiResponse(200, "Data Fetched Successfully", {
        discussionData,
      })
    );
  } catch (error) {
    next(error);
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

const updateProgress = async (req, res) => {
  if (!req.body) {
    throw new ApiError(404, "Request body not found");
  }
  const { style, participants, username, result, position, matchIdentifier } = req.body;

  if (!position || !participants || !style || !result || !matchIdentifier) {
    throw new ApiError(400, "not sufficient data found in the request body");
  }

  // UPDATING MATCH LOGIC

  const players = await Promise.all(
    participants.map(async (elem) => {
      const currentPlayer = await User.findOne({ username: elem.username });
      if (!currentPlayer)
        throw new ApiError(404, `User not found: ${elem.username}`);
      return currentPlayer._id;
    })
  );

  const playerResultDetails = participants.map((elem, idx) => ({
    user: players[idx],
    score: elem.score,
    outcome: elem.outcome,
    ratingChange:
      result === "WIN"
        ? Math.floor(100 / position)
        : -Math.floor(position * 10),
  }));

  const existingMatch = await Match.findOne({ matchIdentifier });
  let updatingTheMatchDetails;

  if (existingMatch) {
    updatingTheMatchDetails = existingMatch;
  } else {
    updatingTheMatchDetails = await Match.create({
      players,
      style,
      results: playerResultDetails,
      matchIdentifier,
    });
  }

  if (!updatingTheMatchDetails) {
    throw new ApiError(
      500,
      "An error occurred while updating the match details"
    );
  }

  const userDetails = await User.findOne({ username: username });
  if (!userDetails) {
    throw new ApiError(404, "User not found");
  }

  userDetails.totalBattles = userDetails.totalBattles + 1;

  const normalizedResult = result.toUpperCase();
  if (normalizedResult === "WIN") {
    userDetails.xp += 15;
    if (userDetails.xp >= userDetails.totalXp) {
      userDetails.level += 1;
      userDetails.xp = userDetails.xp - userDetails.totalXp;
      userDetails.totalXp += 50;
    }
    userDetails.totalWins = userDetails.totalWins + 1;
    userDetails.winStreak = userDetails.winStreak + 1;
    userDetails.currentRating += Math.floor(100 / position);
    if (userDetails.currentRating > userDetails.highestRating) {
      userDetails.highestRating = userDetails.currentRating;
    }
  } else if (normalizedResult === "LOSE") {
    userDetails.winStreak = 0;
    userDetails.xp += 5;
    if (userDetails.xp >= userDetails.totalXp) {
      userDetails.level += 1;
      userDetails.xp = userDetails.xp - userDetails.totalXp;
      userDetails.totalXp += 50;
    }
    userDetails.currentRating -= Math.floor(position * 10);
    if (userDetails.currentRating < 0) {
      userDetails.currentRating = 0;
    }
  } else {
    throw new ApiError(404, "invalid match result passed to the request body");
  }
  

  const currentRatingOfUser = userDetails.currentRating;
  let userRank;

  if (currentRatingOfUser === 0) {
    userRank = "unRanked";
  } else if (currentRatingOfUser > 0 && currentRatingOfUser <= 100) {
    userRank = "Bronze";
  } else if (currentRatingOfUser > 100 && currentRatingOfUser <= 300) {
    userRank = "Silver";
  } else if (currentRatingOfUser > 300 && currentRatingOfUser <= 500) {
    userRank = "Gold";
  } else if (currentRatingOfUser > 500 && currentRatingOfUser <= 1000) {
    userRank = "Platinum";
  } else if (currentRatingOfUser > 1000 && currentRatingOfUser <= 1500) {
    userRank = "Diamond";
  } else if (currentRatingOfUser > 1500 && currentRatingOfUser <= 2000) {
    userRank = "Ace";
  } else {
    userRank = "Legend";
  }

  userDetails.rank = userRank;
  await userDetails.save();

  // UPDATING THE RANKING LOGIC
  let playerRankDetails = await Ranking.findOne({ userId: userDetails._id });

  if (!playerRankDetails) {
    playerRankDetails = await Ranking.create({
      userId: userDetails._id,
      ratings: [{ value: userDetails.currentRating, date: new Date() }],
    });
  } else {
    playerRankDetails.ratings.push({
      value: userDetails.currentRating,
      date: new Date(),
    });
    await playerRankDetails.save();
  }

  return res.status(200).json({
    success: true,
    message: "Progress updated successfully",
    user: userDetails,
    match: updatingTheMatchDetails,
  });
};

const CreateRoom = async (req, res) => {
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
    const { roomCode, time, questions } = req.body;

    if (!roomCode || !questions || !time) {
      throw new ApiError(404, "Required data not found in the request body");
    }

    console.log(time, roomCode, questions);

    const roomDetails = await Room.findOneAndUpdate(
      { roomCode },
      {
        $set: {
          startTime: Date.now(),
          endTime: Date.now() + time * 1000,
          question: questions,
        },
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
    const { roomCode, time, questions } = req.body;

    console.log("fdsf");
    if (!roomCode || !questions || !time) {
      throw new ApiError(404, "Required data not found in the request body");
    }

    // console.log(time, roomCode, questions);

    const roomDetails = await mcqRoom.findOneAndUpdate(
      { roomCode },
      {
        $set: {
          startTime: new Date(),
          endTime: new Date(Date.now() + time * 1000),
          question: questions,
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

export {
  dashboardController,
  updateUserName,
  UpdateUserProfilePicture,
  leaderboardStats,
  discussionDataFetcher,
  QuestionFetcher,
  mcqQuestionFetcher,
  updateProgress,
  CreateRoom,
  findMcqQuestionsFromBackend,
  findQuestionFromBackend,
  joinRoomHandler,
  updateRoomDetails,
  createMcqRoom,
  mcqRoomJoiningHandler,
  updateMcqRoomDetails,
};
