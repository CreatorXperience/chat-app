import express from "express"
import { config } from "dotenv"
import connectToMongoDBDatabase from "./mongoDbConnection"
import {Server} from  "socket.io"
import http from "http"


config()
const app =  express()
let server = http.createServer()
let io = new Server (server,{
   cors:  {
      origin: "http://localhost:3000"
   }
})



let port  = process.env.PORT || 5000

if(!process.env.SECRET){
   process.exit(1)
}

connectToMongoDBDatabase(app, io, port)
