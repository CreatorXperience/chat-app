import express from "express"
import { getSingleUser, getUser, registerUser } from "../controllers/signup/signupControllers"


const router = express.Router()

router.post("/", registerUser)
router.get("/users", getUser)
router.get("/user/:id/:chatId", getSingleUser)



export default router