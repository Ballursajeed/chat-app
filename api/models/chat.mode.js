import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now, 
  },
  sender:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
});

const chatSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    messages: [messageSchema], 
  },
  {
    timestamps: true, 
  }
);

export const Chat = mongoose.model("Chat", chatSchema);
