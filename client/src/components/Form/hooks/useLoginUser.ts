
import { useMutation} from "react-query"
import {ENDPOINT } from "../../../constants/endpoints"
import axiosInstance from "../../../services/axiosInstance"

const loginUser = async(userPayload: { email: string, password: string})=>{
    try{
        let response = await axiosInstance.post(`${ENDPOINT.login}`, userPayload)
        return response.data
    }
    catch(e){
        // @ts-ignore
        console.log(e.response.data.message)
    }

}
const useLoginUser = ()=>{
    
    const {data,isError,isLoading,isSuccess,mutate,error} = useMutation("#register",loginUser, {
        onSuccess: ()=>{
            console.log(" registered successfully")
        },
        onError: ()=>{
            console.log("an error occured while registering user")
        }
    })

    const mutateUserLogin = (userPayload: {email: string, password: string})=>{
    mutate(userPayload)
    }



    return {data,isError,isLoading,isSuccess, mutateUserLogin,error}
}

export default useLoginUser



