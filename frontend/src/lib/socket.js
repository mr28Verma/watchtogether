import { io } from "socket.io-client";

const URL =
  typeof window !== "undefined" &&
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://watchtogether-backend-w26b.onrender.com";

export const socket = io(URL);