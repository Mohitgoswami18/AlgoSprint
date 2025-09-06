import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Match } from "../models/match.model.js";
import { Discuss } from "../models/discuss.model.js";
import { Problem } from "../models/problem.model.js";
import { Question } from "../models/mcq.model.js";
import uploadToCloudinary from "../Utils/cloudinary.js";

const dashboardController = async (req, res, next) => {
  try {
    const { username } = req.params;
    if (!username) {
      throw new ApiError(404, "User Not Found in the request body");
    }

    const userData = await User.findOne({ username });
    if (!userData) {
      throw new ApiError(404, "User Not Found");
    }

    const playstyle = await Match.aggregate([
      {
        $match: {
          clerkId: userData.clerkId,
        },
      },
      {
        $group: {
          _id: { playstyle: "$style" },
          countPlayStyle: { $sum: 1 },
        },
      },
      {
        $sort: {
          countPlayStyle: -1,
        },
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
        winRatio: userData.totalWin
          ? userData.totalBattles / userData.totalWin
          : 0,
        Titles: userData.title,
        winStreak: userData.winStreak,
        maximumRatings: userData.highestRating,
        playstyle: playstyle,
        recentMatches: userData.matches,
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

const mcqQuestionFetcher = async (req, res) => {
  if (!req.headers) {
    throw new ApiError(404, "Headers not found in the request");
  }
  const { topic } = req.headers;

  try {
    const response = await Question.aggregate(
      {
        $match: { topic: topic },
      },
      {
        $sample: { size: 20 },
      }
    );

    if (!response) {
      throw new ApiError(404, "Questions not found in the database");
    }

    res.status(200).json(
      new ApiResponse(200, "Questions Fetched Successfully form the database", {
        Questions: response,
      })
    );
  } catch (error) {
    throw new ApiError(500, "Internal server error ", error);
    console.log(
      "there was an unknown error while fetching the questions from the database"
    );
  }
};

// COMPLETE THIS CONTROLLER TOMMOROW I AM FED UP NOW GOING TO SLEEP 

const updateProgress = async (req, res) => {
//   if (!req.body) {
//     throw new ApiError(404, "Request body not found");
//   }

//   const {
//     xpGained,
//     rankingUpdated,
//     recentMatch,
//     position,
//     opposition,
//     result,
//   } = req.body; // UPDATE THIS AS PER THE NEED LATER ON THIS IS JUST AN TEMPLATE FOR THE WORK FLOW

//   if(!xpGained || !rankingUpdated || !result) {
//     throw new ApiError (400, "not sufficient data provided to update the user ratings")
//   }

//   const userPreviousData = s
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
};
