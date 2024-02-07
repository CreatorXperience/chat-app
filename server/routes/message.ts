import express from "express"
import {getMessages, postMessages} from "../controllers/messages/messagesController"
import authMiddleware from "../middlewares/authMiddleware"

const router =  express.Router()

router.post("/",authMiddleware, postMessages)
router.get("/:chatId", authMiddleware,getMessages)

export default router