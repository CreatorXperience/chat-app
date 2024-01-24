import Joi from "joi"
import TSignupPayload from "../signup/type"
import passComplexity from "joi-password-complexity"

const authValidation = async(payload: Partial<TSignupPayload>)=>{
    let passOptions = {
        min: 6,
        max: 20,
        upperCase: 1,
        lowerCase: 1,
        symbol: 1
    }
    let schema = Joi.object({
        password: passComplexity(passOptions),
        email: Joi.string().email().required()
    })
   return  schema.validate(payload)
}


export default authValidation