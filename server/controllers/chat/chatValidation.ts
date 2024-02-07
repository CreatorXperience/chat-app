import Joi from "joi"

const validation = (payload: {secondUserId: string})=>{
    const schema = Joi.object({
        secondUserId: Joi.string().required()
    })

   return  schema.validate(payload)
}

export default validation