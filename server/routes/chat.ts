import express, { Request } from "express"
import authMiddleware from "../middlewares/authMiddleware"
import { createChat, getChats, getSingleChat } from "../controllers/chat/chatController"

const router = express.Router()

router.post("/", authMiddleware, createChat)


router.get("/",authMiddleware, getChats)


router.get("/find/:secondId",authMiddleware,getSingleChat)

export default router