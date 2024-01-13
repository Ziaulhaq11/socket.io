const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
//TODO:check with new Syntax
const server = http.createServer(app); //In new version No need to import http.

const io = new Server(server, {
    cors: {
        origin: "*",//You cant use localhost here & dont add other options for cors its not working
      },
});

io.on("connection", (socket) => {
  console.log(socket);
  console.log("Socket is active");

  socket.on("chat", (payload) => {
     //we're lstening to the event, so we need to response to that event, so we use IO
    io.emit("chat", payload);
  });
});

//Dont use app.listen() here, as we created Server from Express and on that we added sockets.
server.listen(5000, () => console.log("Server is listening at port 5000...."));
