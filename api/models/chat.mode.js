import mongoose from "mongoose";

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
    messages: [{
      type: String,

    }],
  },
  {
    timestamps: true, // Adds `createdAt` and `updatedAt` for chat document
  }
);

export const Chat = mongoose.model("Chat", chatSchema);