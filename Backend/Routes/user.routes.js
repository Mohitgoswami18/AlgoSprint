import { Router } from "express";
import { dashboardController } from "../controllers/user.controller.js";
import { leaderboardStats } from "../controllers/user.controller.js";
import { discussionDataFetcher } from "../controllers/user.controller.js";
import { QuestionFetcher } from "../controllers/user.controller.js";
import { mcqQuestionFetcher } from "../controllers/user.controller.js";
import { updateProgress } from "../controllers/user.controller.js"

const router = Router();

router.route("/:username/dashboard").get(dashboardController);
router.route("/user/leaderboard").get(leaderboardStats);
router.route("/user/discussion").get(discussionDataFetcher);
router.route("/user/mcqroom/arena/problems").get(mcqQuestionFetcher);
router.route("/user/codingrooms/arena/:topic/problems").get(QuestionFetcher);
router.route("/user/updateRatings").post(updateProgress);

export default router;
