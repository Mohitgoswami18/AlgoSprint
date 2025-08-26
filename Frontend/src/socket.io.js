import { io } from "socket.io-client";

const config = {
  forceNew: true, // NOT "ForceNewConnection"
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  timeout: 10000,
};

export const initialiseSocket = async () => {
  const socket = io(process.env.REACT_APP_SOCKET_URL, config);

  // optional: listen for connection
  socket.on("connect", () => {
    console.log("Connected to server with ID:", socket.id);
  });

  socket.on("connect_error", (err) => {
    console.error("Connection failed:", err.message);
  });

  return socket;
};
