import { Router } from "express"
import { dashboardController } from "../controllers/user.controller.js";
import { leaderboardStats } from "../controllers/user.controller.js"
import { discussionDataFetcher } from "../controllers/user.controller.js";

const router = Router();

router.route("/user/dashboard").get(dashboardController);
router.route("/user/leaderboard").get(leaderboardStats);
router.route("/user/discussion").get(discussionDataFetcher);

export default router;