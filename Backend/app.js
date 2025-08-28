import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"

const app = express();

app.use(cors({origin:process.env.ORIGIN, credentials:true}));
app.use(cookieParser())
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({ extended: true, limit:"16kb" }));
app.use('/static', express.static('public'))



// Protected Routes
import userRoute from "./Routes/user.routes.js";
app.use("/api/v1", userRoute);  

app.use((err, req, res, _) => {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
})

export default app;