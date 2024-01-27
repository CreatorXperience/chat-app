import mongoose from "mongoose";


let chatSchema = new mongoose.Schema({
    members: {type: Array}
}, {timestamps: true})


let ChatModel =  mongoose.model("chats", chatSchema)


export default ChatModel