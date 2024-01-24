import express from "express"
const router =  express.Router()
import loginUser from "../controllers/auth/login"


router.post("/", loginUser)

export default router