
import { useMutation} from "react-query"
import {ENDPOINT } from "../../../constants/endpoints"
import axiosInstance from "../../../services/axiosInstance"

const registerUser = async(userPayload: {name: string, email: string, password: string})=>{
let response = await axiosInstance.post(`${ENDPOINT.signup}`, userPayload)
return response.data

}
const useRegisterUser = ()=>{
    const {data,isError,isLoading,isSuccess,mutate} = useMutation("#register",registerUser, {
        onSuccess: ()=>{
            console.log(" registered successfully")
        },
        onError: ()=>{
            console.log("an error occured while registering user")
        }
    })

    const mutateUser = (userPayload: {name: string,email: string, password: string})=>{
 mutate(userPayload)
    }
    return {data,isError,isLoading,isSuccess, mutateUser}
}

export default useRegisterUser



