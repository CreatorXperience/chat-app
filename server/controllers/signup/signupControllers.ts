import { Request, Response } from "express"
import signupValidation from "./signupValidation"
import SignupModel from "../../models/signupModel"
import bcrypt from "bcryptjs"
import _ from "lodash"


const registerUser = async (req:Request,res:Response)=>{
  
    let {error} = signupValidation(req.body)
    
    if(error){
        return res.status(404).send({message: error.details[0].message, status: 404})
    }
    let user  = await SignupModel.findOne({email: req.body.email})
    if(user){
        return  res.status(404).send({message: "user already exit", status: 404})
    }
    let newUser =  new SignupModel(_.pick(req.body, ["name", "email", "password"]))
    let salt =  await bcrypt.genSalt(10)
    let hashedPass = await bcrypt.hash(newUser.password,salt)
    newUser.password = hashedPass
    let saved = await newUser.save()
    if(!saved){
        return res.status(404).send({message: "error occured while saving user",status: 404})
    }

    res.send(_.pick(saved, ["_id", "name","email"]))
    }



    const getUser = async (req:Request,res:Response)=>{
        let users = await SignupModel.find({}, {password: 0})
        if(!users){
            return res.status(404).send({message: "No user"})
        }
        res.send(users)
        
    }

    const getSingleUser = async(req:Request,res:Response)=>{
        let {id} = req.params
        let user = await SignupModel.findOne({_id: id}, {password: 0})
        if(!user){
            return res.status(404).send({message: "user not found"})
        }
        res.send(user)
    }
        export {registerUser, getUser,getSingleUser}