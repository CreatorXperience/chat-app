import mongoose from "mongoose"
import connectionLogger from "../logger/connectionLogger"
import { Request, Response } from "express"
import express from "express"
import cors from "cors"
import signupUser from "../routes/signup"
import loginUser from "../routes/auth"
import chat from  "../routes/chat"
import message from "../routes/message"
import { DefaultEventsMap } from "socket.io/dist/typed-events"
import { Server, Socket } from "socket.io"


const connectToMongoDBDatabase = async(server: any, io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>, port: number | string)=>{
    let URI =  process.env.URI 
    let onlineUsers:Array<{userId: string, socketId: string}> = []
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
        server.use("/api/messages", message)

        server.get("/", (req:Request,res: Response)=>{
            res.send("welcome to this api")
        })



        // io.use((socket: Socket & {token?: string}, next)=>{
        //     if(!socket.handshake.auth.token){
        //        return    next(new Error("token not found"))
        //     }
        //     socket.token = socket.handshake.auth.token
        //     next()

        // })

        io.listen(8080)

        io.on("connection",  (socket)=>{
           console.log("connected to socket successfully", socket.id)


           socket.on("add",(userId)=> {
            !onlineUsers.some((user)=> user.userId ==  userId )  && 
            onlineUsers.push({
                userId, 
                socketId: socket.id
            })

            io.emit("online-users", onlineUsers)
           })

           socket.on("disconnect", ()=>{
   let online = onlineUsers.filter((user)=> user.socketId !== socket.id)
   
   io.emit("online-users", online)
           })
        })



        
    }
    catch(err){
        console.log("error couldn't connect to mongodb database", err)
    }
}


export default connectToMongoDBDatabase