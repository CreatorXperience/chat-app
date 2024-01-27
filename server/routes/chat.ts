import express, { Request } from "express"
import ChatModel from "../models/chatModel"
import authMiddleware from "../middlewares/authMiddleware"



const router = express.Router()

router.post("/:secondId", authMiddleware, async (req: Request & {userId?: string},res)=>{
    let {secondId} = req.params
    let userId = req.userId
    let chat  =  await ChatModel.findOne({members: {$all: [userId,secondId] }})
    if(chat){
        return res.status(404).send(chat)
    }

    let newChat = new ChatModel({
        members: [userId, secondId]
    })

  let savedChat =  await newChat.save()
  if(!savedChat){
return res.status(500).send({message:  "error occured while creating chat"})
  }
  res.send(savedChat)

})


router.get("/",authMiddleware, async (req:Request & {userId?: string}, res)=>{
  let userId = req.userId
  let chats = await ChatModel.find({members: {$in: userId}})
  if(chats.length < 1){
    return res.status(404).send({message: "chat not found"})
  }
  return res.send(chats)
})


router.get("/single/:secondId",authMiddleware,async(req: Request & {userId?: string},res)=>{
  let {secondId} = req.params
  let userId = req.userId
  let chat  =  await ChatModel.findOne({members: {$all: [userId,secondId] }})
  if(chat){
      return res.status(404).send(chat)
  }
  res.status(404).send({message: "No chat found"})
})

export default router