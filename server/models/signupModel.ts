import mongoose from "mongoose";
import jwt from "jsonwebtoken"


const signupSchema = new mongoose.Schema({
    name: {type: String, required:true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, maxlength: 1024}
},{methods: {
    generateToken: function (){
        let secret = process.env.SECRET as string

        return jwt.sign({_id: this._id}, secret )
    }
}, timestamps: true})


let SignupModel = mongoose.model("users", signupSchema)

export default SignupModel