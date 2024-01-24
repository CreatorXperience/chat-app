import express from "express"
import registerUser from "../controllers/signup/signupControllers"

const router = express.Router()

router.post("/", registerUser)



export default router