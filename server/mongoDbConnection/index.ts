import mongoose from "mongoose"
import connectionLogger from "../logger/connectionLogger"
import { Request, Response } from "express"
import express from "express"
import cors from "cors"
import signupUser from "../routes/signup"
import loginUser from "../routes/auth"
import chat from  "../routes/chat"


const connectToMongoDBDatabase = async(server: any, port: number | string)=>{
    let URI =  process.env.URI 
   
    if(!URI){
        return console.log("URI not provided")
    }
    try{
      await mongoose.connect(URI)

      let responseHeaders  = {
allowedHeaders: ['Accept-Version', 'Authorization', 'Credentials', 'Content-Type'],
  exposedHeaders: ['Authorization']
      }
        server.listen(port, ()=>{
            connectionLogger.info("connected to mongodb server successfully")
        })

        server.use(express.json())
        server.use(express.urlencoded({extended:true}))
        server.use(cors(responseHeaders))
        server.use("/api/signup", signupUser)
        server.use("/api/login", loginUser)
        server.use("/api/chats", chat )

        server.get("/", (req:Request,res: Response)=>{
            res.send("welcome to this api")
        })
    }
    catch(err){
        console.log("error couldn't connect to mongodb database", err)
    }
}


export default connectToMongoDBDatabase