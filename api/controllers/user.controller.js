import mongoose from "mongoose";
import { Chat } from "../models/chat.mode.js";
import { User } from "../models/user.model.js";

const userRegister = async(req,res) => {
    const {username, fullName, password,email} = req.body;
try {
    
        if (!username || !fullName || !password || !email ) {
            return res.status(400).json({
                message: "All Fields are Required!",
                success: false,
                status:400
            })
        }
    
        const existingUserwithUsername = await User.findOne({username});
    
        if (existingUserwithUsername) {
            return res.status(400).json({
                message:"username is already used by another user!",
                success:false,
                status: 400
            })
        }
    
        const existingUserwithEmail = await User.findOne({email});
    
        if (existingUserwithEmail) {
            return res.status(400).json({
                message:"Email is already used by another user!",
                success:false,
                status: 400
            })
        }
    
        const user = await User.create({
            username,
            fullName,
            email,
            password
        });
    
        res.status(201).json({
            message: "User Registered Successfully!",
            status:201,
            success: true,
            user
        });
    
} catch (error) {
    return res.status(500).json({
        message: "OOPS!! Something Went Wrong While Registering a User!!",
        status: 500,
        errorMessage: error.message,
        error
     })
}
}

const userLogin = async(req,res) =>{
    try {
        const {username,password} = req.body;
    
        if (!username || !password) {
            return res.status(400).json({
                message:"All Fields are required",
                status:400,
                success: false
            })
        }
    
        const user = await User.findOne({username});
    
        if (!user) {
            return res.status(404).json({
                message:"User is not Register",
                status:404,
                success: false
            })
        }
    
        const isMatch = await user.isPasswordCorrect(password);
    
        if (!isMatch) {
            return res.status(400).json({
                message:"username or password is Incorrect!",
                status:400,
                success: false
            })
        }
    
        const accessToken = await user.generateAccessToken(user._id);
    
        user.accessToken = accessToken;
    
        await user.save({validateBeforeSave: false})
        
        const option = {
            secure: true,
            sameSite: 'None',
             path: '/',
             httpOnly: true,  
             maxAge: 7 * 24 * 60 * 60 * 1000,
           }

        res
        .status(200)
        .cookie("accessToken",accessToken,option)
        .json({
            message:"User loggedIn SuccessFully!",
            status:200,
            success:true,
            user,
            accessToken
        });

    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            message: "OOPS!! Something Went Wrong While Logging a User!!",
            status: 500,
            errorMessage: error.message,
            error
         })
    }
    
}

const checkAuth = async(req,res) => {
    try {
        const user = req.user; 
        if (!user) {
            return res.status(401).json({ message: "Not authenticated" });
        }
        res.status(200).json({ 
            message:"User Authenticated",
            status: 200,
            user
         });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

const getAllUsers = async(req,res) => {
   try {
     const users = await User.find({});
     res.status(200).json({
         message:"Users fetched successfully!",
         status:200,
         success:true,
         users
     })
   } catch (error) {
    return res.status(500).json({
        message: "OOPS!! Something Went Wrong While Fetching a Users!!",
        status: 500,
        errorMessage: error.message,
        error
     })
   }
}

const getMyMessages = async(req,res) => {

    try {
        const sender = req.params;
    
        const receiver = req.user?._id;
        const chat = await Chat.findOne({
            sender:  new mongoose.Types.ObjectId(sender),
            receiver: new mongoose.Types.ObjectId(receiver),
        });

        if (!chat) {
            return res.status(404).json({
                message:"Chats are Empty!",
                status:404,
                success:false
            })
        }
    
      res.status(200).json({
        message: "Messages Fetched Successfully!",
        status:200,
        success:true,
        messages: chat?.messages || [],
        receiver
      })
    } catch (error) {
        return res.status(500).json({
            message: "OOPS!! Something Went Wrong While Fetching a Messages!!",
            status: 500,
            errorMessage: error.message,
            error
         })
    }

}

const getAllMessages = async(req,res) => {
        const sender = req.params;
    
        const receiver = req.user?._id;
        const incommingChat = await Chat.findOne({
            sender:  new mongoose.Types.ObjectId(sender),
            receiver: new mongoose.Types.ObjectId(receiver),
        }).sort({createdAt: -1}).lean();;

        const outGoingChat = await Chat.findOne({
            sender:  new mongoose.Types.ObjectId(receiver),
            receiver: new mongoose.Types.ObjectId(sender),
        }).sort({ createdAt: -1 }).lean();;

        let messages = [];

        if (incommingChat) {
          messages = [...messages, ...incommingChat.messages];
        }
    
        if (outGoingChat) {
          messages = [...messages, ...outGoingChat.messages];
        }
    
        // Sort all messages by timestamp in descending order (newest first)
        messages.sort((a, b) => new Date(b.timestamp) - new Date(b.timestamp));

    res.status(200).json({
        message: "All messages fetched Successfully!",
        status:200,
        success: true,
        messages
    })

}

export {
    userRegister,
    userLogin,
    checkAuth,
    getAllUsers,
    getMyMessages,
    getAllMessages
}