import express from "express"
import { config } from "dotenv"
import connectToMongoDBDatabase from "./mongoDbConnection"
config()
const app =  express()

let port  = process.env.PORT || 5000

if(!process.env.SECRET){
   process.exit(1)
}

connectToMongoDBDatabase(app, port)
