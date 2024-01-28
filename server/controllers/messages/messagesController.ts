import { Request, Response } from "express";
import Joi from "joi";
import MessageModel from "../../models/messagesModel";
import mongoose from "mongoose";


type TChat = {
    chatId: string,
    senderId: string,
    text: string
}
const messageValidation = (messagePayload: TChat)=>{
    const schema = Joi.object({
        chatId: Joi.string().required(),
        senderId: Joi.string().required(),
        text: Joi.string().required()
    })

  return   schema.validate(messagePayload)
}

const postMessages  = async (req:Request, res: Response)=>{
    const {error} = messageValidation(req.body)
    if(error){
        return  res.status(404).send({message: error.details[0].message})
    }
    let {chatId,senderId, text} =  req.body

    let messagePayload = {chatId: new mongoose.Types.ObjectId(chatId), senderId, text}
    let newMessage = new  MessageModel(messagePayload)
    let savedMessages =    await newMessage.save()
    return res.send(savedMessages)
}


const getMessages = async (req:Request, res: Response)=>{
    let {chatId} =  req.params
    const messages = await MessageModel.find({chatId:  chatId})
    if(!messages){
      return  res.status(404).send({message: "No messages found"})
    }
   return res.send(messages)
}
export {postMessages, getMessages} 