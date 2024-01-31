import { Request, Response } from "express"
import ChatModel from "../../models/chatModel"
import validation from "./chatValidation"


const  createChat = async (req: Request & {userId?: string},res:Response)=>{
  const {error}  =  validation(req.body)
    if(error){
        return res.status(404).send({message: error.details[0].message})
    }
    let userId = req.userId
    let chat  =  await ChatModel.findOne({members: {$all: [userId,req.body.secondUserId] }})
    if(chat){
        return res.status(200).send(chat)
    }

    let newChat = new ChatModel({
        members: [userId, req.body.secondUserId]
    })

  let savedChat =  await newChat.save()
  if(!savedChat){
return res.status(500).send({message:  "error occured while creating chat"})
  }
  res.send(savedChat)
}


const getChats = async (req:Request & {userId?: string}, res: Response)=>{
    let userId = req.userId
    let chats = await ChatModel.find({members: {$in: [userId]}})
    if(chats.length < 1){
      return res.status(404).send({message: "chat not found"})
    }
    return res.send(chats)
  }


  const getSingleChat = async(req: Request & {userId?: string},res: Response)=>{
    let {secondId} = req.params
    let userId = req.userId
    let chat  =  await ChatModel.findOne({members: {$all: [userId,secondId] }})
    if(chat){
        return res.status(404).send(chat)
    }
    res.status(404).send({message: "No chat found"})
  }


  export {createChat, getChats, getSingleChat}