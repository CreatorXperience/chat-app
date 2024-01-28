import Joi from "joi"

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

export default messageValidation