
import { useMutation} from "react-query"
import {ENDPOINT } from "../../../constants/endpoints"
import axiosInstance from "../../../services/axiosInstance"

const loginUser = async(userPayload: { email: string, password: string})=>{
let response = await axiosInstance.post(`${ENDPOINT.login}`, userPayload)
return response.data

}
const useLoginUser = ()=>{
    const {data,isError,isLoading,isSuccess,mutate} = useMutation("#register",loginUser, {
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
    return {data,isError,isLoading,isSuccess, mutateUserLogin}
}

export default useLoginUser



