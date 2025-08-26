import ConnectToDatabase from "./Database/database.js";
import dotenv from "dotenv";
import app from "./app.js";
import http from "node:http";
import { Server } from "socket.io";

dotenv.config();

const config = {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
};

const server = http.createServer(app);
const io = new Server(server, config);

io.on("connection", (socket) => {
  console.log(socket.id)
});

const port = process.env.PORT || 3000;

const connectingDatabase = async () => {
  await ConnectToDatabase();
};

connectingDatabase();
