import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./database/index.js";
import cors from "cors"
import userRoutes from "./routes/user.routes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import http from "http"
import { Server } from "socket.io";


dotenv.config();
connectDB();
const app = express();
app.use(express.json()); 
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors:{
    origin:"*",
    methods:["GET", "POST"]
  }
})
io.on("connection", (socket)=>{
  console.log("User Connecected" + socket.id)
  socket.on("join_room", (data) => {
    socket.join(data)
  })
  
  socket.on("message", (data) => {
    console.log("Message received:", data);

    io.emit("message", data);
  })
  
})

app.use("/api/user", userRoutes);
server.listen(5000, ()=>{
  console.log("Server is Running")

})
app.use(notFound);
app.use(errorHandler);



