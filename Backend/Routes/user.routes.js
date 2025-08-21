import { Router } from "express"
import { dashboardController } from "../controllers/user.controller.js";

const router = Router();

router.route("/dashboard").get(dashboardController);


export default router;