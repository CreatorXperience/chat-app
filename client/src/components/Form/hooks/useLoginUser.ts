
import { useMutation} from "react-query"
import {ENDPOINT } from "../../../constants/endpoints"
import axiosInstance from "../../../services/axiosInstance"
import { useState } from "react"

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
const useLoginUser = ()=>{
    const [loginResponse,setLoginResponse] = useState<any>()
    let [errorResponse , setErrorResponse] =  useState<{message: string}>()
    const {isError,isLoading,isSuccess,mutate,error} = useMutation("#registeruser", loginUser)

    const mutateUserLogin = (userPayload: {email: string, password: string})=>{
    mutate(userPayload, {
        onError(error, variables, context) {
            setErrorResponse(error as  {message: string})
        },
        onSuccess(data){
            setLoginResponse(data)
        }
    })
    }
    return {isError,isLoading,isSuccess, mutateUserLogin, loginResponse,}
}

export default useLoginUser



