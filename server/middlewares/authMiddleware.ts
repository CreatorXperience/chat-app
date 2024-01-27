import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import SignupModel from "../models/signupModel";

const authMiddleware = async (req:Request & {userId?: string}, res:Response, next: NextFunction)=> {
    let token  =  req.header("Authorization") as string
    if(!token){
        return res.status(401).send({message: "Permission Denied. No token provided"})
    }
    try{
        let decoded = jwt.decode(token) as JwtPayload
    if(decoded){
        let user = await SignupModel.findOne({_id: decoded._id})
        if(!user){
            return res.status(404).send({message: "Permission Denied. User not found"})
        }

        req.userId = user._id.toHexString()
        next()
        return 
    }
    return res.status(400).send({message: "Permission Denied. Invalid id"})
    }
    catch(e){
        return res.status(500).send({message: "error occured while reading token"})
    }


}


export default authMiddleware