import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { Server } from "socket.io";
import { createServer } from 'node:http';
import cors from "cors"
import { connectDB } from "./db/index.db.js";
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT;
const server = createServer(app)
const io = new Server(server, {
    connectionStateRecovery: {},
    cors: {
        origin: 'http://localhost:5173',  // Frontend address
        methods: ['GET', 'POST'],
        credentials: true
    }
})

connectDB()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,  // Allow cookies and credentials,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json())
app.use(cookieParser())

app.get("/",(req,res) => {
    res.send("Hello from backend")
});

import userRouter from "./routes/user.rotues.js";
import { Chat } from "./models/chat.mode.js";
app.use('/api/v1/user',userRouter);

const users  = new Map();

io.on('connection',(socket) => {

    console.log("User is Connected! with id: ",socket.id);

    socket.on('register', (userId) => {
        users.set(userId, socket.id);
        console.log(`Registered:`,users);
        
    });

    socket.on('send-message',async({message, userId, targetId}) => {
        console.log(`Message from ${userId} to ${targetId}: ${message}`);
        
        const targetSocketId = users.get(targetId);
        console.log("target socketID",targetSocketId);
        
        if (targetSocketId) {
           await Chat.create({
                message,
                sender: userId,
                receiver: targetId,
                isDelevered:true
            })
            io.to(targetSocketId).emit('receive-message',{
                message,
                sender: userId
            })
        } else {
            console.log(`Target user ${targetId} is not connected!`);
            await Chat.create({
                message,
                sender: userId,
                receiver: targetId,
                isDelevered: false
            })
        }

    })

    console.log("users map:",users);
    

    socket.on("disconnect", () => {
        console.log('User disconnected:', socket.id);
        for (let [userID, socketId] of users.entries()) {
            if (socketId === socket.id) {
                users.delete(userID);
                break;
            }
        }
    });
    })

server.listen(port, () => {
    console.log(`Server is running on PORT: ${port}`);
})