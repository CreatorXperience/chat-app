
import { useMutation} from "react-query"
import {ENDPOINT } from "../../../constants/endpoints"
import axiosInstance from "../../../services/axiosInstance"
import { useState } from "react"

const registerUser = async(userPayload: {name: string, email: string, password: string})=>{
    try{

        let response = await axiosInstance.post(`${ENDPOINT.signup}`, userPayload)
        return response.data
    }catch(e:any){
        return e.response.data
    }

}
const useRegisterUser = ()=>{
    const [registerResponse,setRegisterResponse] = useState<any>()
    let [registerError , setregisterError] =  useState<{message: string}>()
    const {data,isError,isLoading,isSuccess,mutate} = useMutation("#register",registerUser, {
        onSuccess: ()=>{
            console.log(" registered successfully")
        },
        onError: ()=>{
            console.log("an error occured while registering user")
        }
    })

    const mutateUser = (userPayload: {name: string,email: string, password: string})=>{
 mutate(userPayload,{
    onError(error, variables, context) {
        setregisterError(error as  {message: string})
    },
    onSuccess(data){
        setRegisterResponse(data)
    }
})
    }
    return {isError,isLoading,isSuccess, mutateUser,registerResponse,registerError}
}

export default useRegisterUser



