import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"


const app = express();
dotenv.config({path: "./.env"})

app.use(cors({ origin: process.env.ORIGIN, credentials: true }));
app.use(cookieParser());
app.use("/api/v1/webhooks", express.raw({ type: "application/json" }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use("/static", express.static("public"));

// Unprotected routes
import webhookRoute from "./Routes/webhook.routes.js";
app.use("/api/v1", webhookRoute);


// Protected Routes
import userRoute from "./Routes/user.routes.js";
app.use("/api/v1", userRoute);


app.use((err, req, res, _) => {
  console.log(err);
  res.status(500).json({ error: "Internal Server Error" });
});

export default app;
