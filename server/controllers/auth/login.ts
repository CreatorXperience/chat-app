import { Request,Response } from "express"
import authValidation from "./authValidation"
import SignupModel from "../../models/signupModel"
import bcrypt from "bcryptjs"
import _ from "lodash"

const loginUser = async (req:Request,res:Response)=>{
    let {error} = await authValidation(req.body)
    if(error){
        return res.status(404).send({message: error.details[0].message, status: 404})
    }
    let user = await SignupModel.findOne({email: req.body.email})
    if(!user){
        return  res.status(404).send({message: "user doesn't exist", status: 404})
    }
    let isPassEqual  = await  bcrypt.compare(req.body.password,user.password)
    if(!isPassEqual){
    return res.status(404).send({message: "Invalid email or password" ,status: 404})
    }
    let token = user.generateToken()
    let userResponse = {..._.pick(user, ["name","email", "_id"]), token: token, status: 200}
    res.appendHeader("Authorization", token)
    .send(userResponse)
    }

    export default loginUser