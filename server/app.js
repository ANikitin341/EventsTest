const express = require("express");
const path = require("path");

const app = express();

app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const http = require("http");
const _ = require("lodash");
const socketIo = require("socket.io");
const Redis = require("ioredis");

const port = process.env.PORT || "8080";
app.set("port", port);

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});
const redis = new Redis();
const sockets = [];
const events = [];

io.on("connection", (socket) => {
  sockets.push(socket);

  socket.on("disconnect", () => {
    sockets.splice(sockets.indexOf(socket), 1);
  });
});

const emitEvents = _.throttle(() => {
  if (events.length === 0) {
    return;
  }

  sockets.forEach((socket) => {
    socket.emit("events", events);
  });

  events.splice(0, events.length);
}, 5000);

redis.subscribe("events", (error, count) => {
  if (error) {
    console.log("ERROR - redis.subcribe", error);
    return;
  }
});

redis.on("message", (channel, message) => {
  if (channel !== "events") {
    console.log("ERROR - redis.on", channel);
    return;
  }

  emitEvents();
  events.unshift(JSON.parse(message));
});

redis.on("error", (error) => {
  if (error) {
    console.log("ERROR - redis.on", error);
    return;
  }

  sockets.forEach((socket) => {
    socket.emit("error", error);
  });
});

server.listen(port, () => console.log(`listening ${port}...`));
