import ConnectToDatabase from "./Database/database.js";
import dotenv from "dotenv";
import app from "./app.js";
import http from "node:http";
import { Server } from "socket.io";

dotenv.config();

const config = {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
};

const server = http.createServer(app);
const io = new Server(server, config);
const user = {};

io.on("connection", (socket) => {

  socket.on("join", ({ username, roomid }) => {

    user[socket.id] = username;
    socket.join(roomid);

    const getAllConnectedUsers = (roomid) => {
      return Array.from( io.sockets.adapter.rooms.get(roomid) || []).map((socketId) => {
        return { username: user[socketId], socketId };
      });
    }

    const connectedUsers = getAllConnectedUsers(roomid);
    console.log(connectedUsers)
    connectedUsers.forEach(({socketId}) => {
      io.to(socketId).emit("connected", {
        connectedUsers,
        user: username,
        socketId: socket.id,
      });
    });

    socket.on("change", ({ roomid, code }) => {
      console.log(
        "📩 Server got change from",
        socket.id,
        ":",
        code.slice(0, 20),
        roomid
      );
      socket.to(roomid).emit("code-change", ({code}));
    });

    socket.on("langChange", ({roomid, lang, ver}) => {
      console.log("language changed from", socket.id, "new langauge anf value ", roomid, lang, ver)
      socket.to(roomid).emit("langChanged", ({ lang, ver }));
    });

    socket.on("codeOutput", ({roomid, output, err}) => {
      socket.to(roomid).emit("codeOutput", ({ output, err }));
    });

    socket.on("leave", ({ username, roomid }) => {
      socket.leave(roomid);
      delete user[socket.id];
      const connectedUsers = getAllConnectedUsers(roomid);
      connectedUsers.forEach(({socketId}) => {
        io.to(socketId).emit("user-disconnected", {
          username,
          socketId: socket.id,
        });
      });
    });
  });

  
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log("The server is running on the port", port);
})

const connectingDatabase = async () => {
  await ConnectToDatabase();
};

connectingDatabase();
