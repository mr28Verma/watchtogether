require("dotenv").config()
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.get("/", (req, res) => {
  res.send("WatchTogether backend running");
});

const roomStates = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // JOIN ROOM
  socket.on("join-room", ({ roomId, username }) => {
  socket.join(roomId);

  socket.data.roomId = roomId;
  socket.data.username = username;

  console.log(`${username} joined room: ${roomId}`);

  const room = io.sockets.adapter.rooms.get(roomId);

  const count = room ? room.size : 1;

  io.to(roomId).emit("room-presence", {
    roomId,
    count,
  });

  io.to(roomId).emit("system-message", {
    text: `${username} joined the room`,
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  });

  const state = roomStates[roomId];

  if (state) {
    socket.emit("room-state", state);
  }
});

  // REQUEST PRESENCE
  socket.on("request-presence", ({ roomId }) => {
    const room = io.sockets.adapter.rooms.get(roomId);

    const count = room ? room.size : 1;

    io.to(roomId).emit("room-presence", {
      roomId,
      count,
    });
  });

  // SEND MESSAGE
  socket.on("send-message", (data) => {
    console.log("Message received:", data);

    socket.to(data.roomId).emit("receive-message", data);
  });

  socket.on("sync-video", (data) => {
    roomStates[data.roomId] = {
      ...(roomStates[data.roomId] || {}),
      videoUrl: data.videoUrl,
    };

    socket.to(data.roomId).emit("video-synced", data);
  });

  socket.on("video-play", (data) => {
    roomStates[data.roomId] = {
      ...(roomStates[data.roomId] || {}),
      playing: true,
      currentTime: data.time,
    };

    socket.to(data.roomId).emit("video-play", data);
  });

  socket.on("video-pause", (data) => {
    roomStates[data.roomId] = {
      ...(roomStates[data.roomId] || {}),
      playing: false,
      currentTime: data.time,
    };

    socket.to(data.roomId).emit("video-pause", data);
  });

  // DISCONNECT
socket.on("disconnect", () => {
  const roomId = socket.data.roomId;
  const username = socket.data.username;

  if (!roomId) return;

  setTimeout(() => {
    const room = io.sockets.adapter.rooms.get(roomId);

    const count = room ? room.size : 0;

    // UPDATE USER COUNT
    io.to(roomId).emit("room-presence", {
      roomId,
      count,
    });

    // USER LEFT MESSAGE
    if (username) {
      io.to(roomId).emit("system-message", {
        text: `${username} left the room`,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
    }

    // EXPIRE ROOM
    if (count === 0) {
      delete roomStates[roomId];

      console.log(`Room expired: ${roomId}`);
    }
  }, 300);

  console.log("User disconnected");
});
});



const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});