import { Router } from "express";
import { dashboardController } from "../controllers/user.controller.js";
import { leaderboardStats } from "../controllers/user.controller.js";
import { discussionDataFetcher } from "../controllers/user.controller.js";
import { QuestionFetcher } from "../controllers/user.controller.js";
import { mcqQuestionFetcher } from "../controllers/user.controller.js";
import { updateProgress } from "../controllers/user.controller.js";
import { CreateRoom } from "../controllers/user.controller.js";
import { findQuestionFromBackend } from "../controllers/user.controller.js";
import { updateUserName } from "../controllers/user.controller.js";
import { joinRoomHandler } from "../controllers/user.controller.js";
import { updateRoomDetails } from "../controllers/user.controller.js";
import { createMcqRoom } from "../controllers/user.controller.js";
import { mcqRoomJoiningHandler } from "../controllers/user.controller.js";
import { upload } from "../Middlewares/multer.middleware.js";
import { updateMcqRoomDetails } from "../controllers/user.controller.js";
import { findMcqQuestionsFromBackend } from "../controllers/user.controller.js";
import {UpdateUserProfilePicture} from "../controllers/user.controller.js"
import { discussionDataUpation } from "../controllers/user.controller.js";

const router = Router();

router.route("/user/dashboard").get(dashboardController);
router.route("/user/leaderboard").get(leaderboardStats);
router.route("/user/discussion").get(discussionDataFetcher);
router.route("/user/updateDiscussion").post(discussionDataUpation);
router.route("/user/updatename").post(updateUserName);
router.route("/user/mcqroom/arena/topic/problems").get(mcqQuestionFetcher);
router.route("/user/codingrooms/arena/problems").get(QuestionFetcher);
router.route("/user/rooms/createNewRoom").post(CreateRoom);
router.route("/user/rooms/joinRoom").post(joinRoomHandler);
router.route("/user/codingrooms/updateRoomDetails").post(updateRoomDetails);
router
  .route("/user/updateuserprofilepicture")
  .post(upload.single("profilePic"), UpdateUserProfilePicture);
router
  .route("/user/codingrooms/arena/getProblems")
  .get(findQuestionFromBackend);
router.route("/user/mcqrooms/createmcqroom").post(createMcqRoom);
router.route("/user/mcqrooms/joinmcqroom").post(mcqRoomJoiningHandler);
router.route("/user/mcqrooms/updateroomdetails").post(updateMcqRoomDetails);
router
  .route("/user/mcqrooms/arena/getProblems")
  .get(findMcqQuestionsFromBackend);
router.route("/user/updateRatings").post(updateProgress);

export default router;
