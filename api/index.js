import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { Server } from "socket.io";
import { createServer } from 'node:http';
import cors from "cors"
import { connectDB } from "../db/index.db.js";
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT;
const server = createServer(app)
const io = new Server(server, {
    connectionStateRecovery: {},
    cors: {
        origin: 'https://chat-app-client-h8ym.onrender.com',  // Frontend address
        methods: ['GET', 'POST'],
        credentials: true
    }
})

connectDB()

app.use(cors({
    origin: 'https://chat-app-client-h8ym.onrender.com',
    credentials: true,  // Allow cookies and credentials,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json())
app.use(cookieParser())

app.get("/",(req,res) => {
    res.send("Hello from backend")
});

import userRouter from "../routes/user.rotues.js";
import { Chat } from "../models/chat.mode.js";
import mongoose from "mongoose";
import { User } from "../models/user.model.js";
app.use('/api/v1/user',userRouter);

const users  = new Map();

io.on('connection',(socket) => {

    console.log("User is Connected! with id: ",socket.id);
    socket.on('register', async({userId}) => {
        if (userId) {
          const dbUser = await User.findById({
            _id: userId
          }
          );

          dbUser.isOnline = true;
          dbUser.save()
            users.set(userId, socket.id);
            console.log(`Registered:`, users);
            
          } else {
            console.error('userId is not provided or invalid');
          }
    });

    socket.on('send-message', async ({ message, sender, receiver }) => {
        try {
          console.log(`Message from ${sender} to ${receiver}: ${message}`);
         
          let chat = await Chat.findOne({
            sender: new mongoose.Types.ObjectId(sender),
            receiver: new mongoose.Types.ObjectId(receiver),
          });
      
          const messageObj = {
            message: message,
            timestamp: new Date(),
            sender
          };

          const senderSocketId = users.get(sender);
          
          io.to(senderSocketId).emit('myMessage',{
            message:messageObj,
            sender,
            timestamp: messageObj.timestamp,
          })

          if (!chat) {
            chat = await Chat.create({
              sender: new mongoose.Types.ObjectId(sender),
              receiver: new mongoose.Types.ObjectId(receiver),
              messages: [messageObj], 
            });
          } else {
            chat.messages.push(messageObj); 
            await chat.save();
          }
      
          const targetSocketId = users.get(receiver);
          if (targetSocketId) {
            io.to(targetSocketId).emit('receive-message', {
              message:messageObj,
              sender,
              timestamp: messageObj.timestamp,
            });
          }
        } catch (error) {
          console.error("Error handling send-message:", error);
        }
      });
      
    socket.on("disconnect", async() => {
        console.log('User disconnected:', socket.id);
        for (let [userID, socketId] of users.entries()) {
            if (socketId === socket.id) {
              const dbUser = await User.findById({
                _id: userID
              }
              );
    console.log("deleting User:",dbUser);
    
              dbUser.isOnline = false;
              dbUser.save()
                users.delete(userID);
                
                break;
            }
        }
    });
    })

server.listen(port, () => {
    console.log(`Server is running on PORT: ${port}`);
})