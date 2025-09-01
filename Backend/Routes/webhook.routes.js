import { Router } from "express";
import webhookHandler from "../controllers/webhook.controller.js";
const router = Router();

router.route("/webhooks").post(webhookHandler)

export default router;