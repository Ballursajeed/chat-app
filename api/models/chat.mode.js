import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
    {
        sender:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        receiver:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        message:{
            type:String,
        },
        isDelevered: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

export const Chat = mongoose.model("Chat",chatSchema)