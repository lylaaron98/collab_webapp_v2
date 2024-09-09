import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  messages: [
    {
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      content: { type: String, required: true },
    },
  ],
});

const Chat = mongoose.models.Chat || mongoose.model("Chat", chatSchema);

export default Chat;
