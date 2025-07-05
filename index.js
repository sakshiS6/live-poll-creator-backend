
//importing express
const express = require("express");
const RoomRouter = require("./routers/roomRouter");
const UserRouter = require("./routers/userRouter");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");
const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("client connected");

  socket.on('join-room', (roomName) => {
    socket.join(roomName);
    console.log('joined room '+roomName);
    
  });

  socket.on('set-question', ({question, roomName}) => {
    console.log(question + ' in room ' + roomName);
    
    socket.to(roomName).emit('get-question', question);

  })

  socket.on('send-response', ({response,roomName}) => {
    console.log(response + ' in room ' + roomName);
    
    socket.to(roomName).emit('get-response', response);

  })

});

//creating an express app


const port = 5000;

//middleware
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use("/user", UserRouter);
app.use("/room", RoomRouter);

//route or endpoint
app.get("/", (req, res) => {
  res.send("response to express");
});
//starting the server
httpServer.listen(port, () => {
  console.log("Server Started");
});
