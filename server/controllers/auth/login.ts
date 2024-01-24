import { Request,Response } from "express"
import authValidation from "./authValidation"
import SignupModel from "../../models/signupModel"
import bcrypt from "bcryptjs"
import _ from "lodash"

const loginUser = async (req:Request,res:Response)=>{
    let {error} = await authValidation(req.body)
    if(error){
        return res.status(404).send({message: error.details[0].message})
    }
    let user = await SignupModel.findOne({email: req.body.email})
    if(!user){
        return  res.status(404).send({message: "user doesn't exist"})
    }
    let isPassEqual  = await  bcrypt.compare(req.body.password,user.password)
    if(!isPassEqual){
    return res.status(404).send({message: "Invalid email or password"})
    }
    let token = user.generateToken()
    res.setHeader("Authorization", token)
    .send(_.pick(user, ["name","email", "_id"]))
    }

    export default loginUser