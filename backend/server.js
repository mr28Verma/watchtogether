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
  socket.on("join-room", (roomId) => {
    socket.join(roomId);

    console.log(`User joined room: ${roomId}`);

    const room = io.sockets.adapter.rooms.get(roomId);

    const count = room ? room.size : 1;

    io.to(roomId).emit("room-presence", {
      roomId,
      count,
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
    setTimeout(() => {
      io.sockets.adapter.rooms.forEach((clients, roomId) => {
        if (!clients.has(roomId)) {
          const count = clients.size;

          io.to(roomId).emit("room-presence", {
            roomId,
            count,
          });
        }
      });
    }, 300);

    console.log("User disconnected");
  });
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});