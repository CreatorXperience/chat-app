import { ENDPOINT } from "../../constants/endpoints"
import axiosInstance from "../../utils/axiosInstance"

const loginUser = async(userPayload: { email: string, password: string})=>{
    try{
        let response = await axiosInstance.post(`${ENDPOINT.login}`, userPayload)
        console.log(response.data)
        return response.data
    }
    catch(e){
        // @ts-ignore
        return e.response.data
    }

}


const registerUser = async(userPayload: {name: string, email: string, password: string})=>{
    try{

        let response = await axiosInstance.post(`${ENDPOINT.signup}`, userPayload)
        return response.data
    }catch(e:any){
        return e.response.data
    }

}


export {loginUser,registerUser}