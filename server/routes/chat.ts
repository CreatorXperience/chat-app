import express from "express"
import ChatModel from "../models/chatModel"



const router = express.Router()

router.post("/:firstId/:secondId", async (req,res)=>{
    let {firstId,secondId} = req.params
    let chat  =  await ChatModel.findOne({members: {$all: [firstId,secondId] }})
    if(chat){
        return res.status(404).send(chat)
    }

    let newChat = new ChatModel({
        members: [firstId, secondId]
    })

  let savedChat =  await newChat.save()
  if(!savedChat){
return res.status(500).send({message:  "error occured while creating chat"})
  }
  res.send(savedChat)

})


router.get("")