import mongoose from  "mongoose"

let  messageSchema = new mongoose.Schema({
    chatId: {type: mongoose.Schema.Types.ObjectId,required: true, ref: 'chats'},
    senderId: {type: String, required: true},
    text: {type: String, required: true}
})


let MessageModel =  mongoose.model("messages", messageSchema)


export default MessageModel