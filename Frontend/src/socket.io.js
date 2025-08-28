import { io } from "socket.io-client";

const config = {
  forceNew: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  timeout: 10000,
};

export const initialiseSocket = async () => {
    const url = import.meta.env.VITE_SOCKET_URL;
    const socket = io(
      url,
      config
    );

  return socket;
};
