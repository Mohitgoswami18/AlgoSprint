import { Router } from "express"
import { dashboardController } from "../controllers/user.controller.js";
import { leaderboardStats } from "../controllers/user.controller.js"
import { discussionDataFetcher } from "../controllers/user.controller.js";

const router = Router();

router.route("/dashboard/:username").get(dashboardController);
router.route("/leaderboard").get(leaderboardStats);
router.route("/discussion").get(discussionDataFetcher);

export default router;