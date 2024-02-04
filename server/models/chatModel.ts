import mongoose from "mongoose";


let chatSchema = new mongoose.Schema({
    members: [{type: mongoose.Schema.Types.ObjectId, ref: "users"}],
}, {timestamps: true})


let ChatModel =  mongoose.model("chats", chatSchema)


export default ChatModel