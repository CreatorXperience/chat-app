import { useMutation } from "react-query"
import axiosInstance from "../../utils/axiosInstance"
import { ENDPOINT } from "../../constants/endpoints"
import { useState } from "react"
import { toast } from "react-toastify"

const useCreateChat = ()=>{
    const [response, setResponse] = useState()
    const createChat = async(userId: string)=>{
        let token  = localStorage.getItem("userinfo")
        if(token){

            let parsedToken =  JSON.parse(token)
            
            try{
                let response =  await axiosInstance.post(`${ENDPOINT.chats}`,{secondUserId: userId }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': parsedToken.token
                    }
                })
    
                toast("chat created")
                return response.data
            }
            catch(e){
                return e
            }
        }
    }

    const {data, mutate, isLoading, isError, isSuccess} =  useMutation("create-chats", createChat)


    const mutateChat = (userId: string)=>{
        mutate(userId, {onSuccess: (data)=>{
         
        setResponse(data)
        }})
    }
    return {data, mutateChat, isLoading, isError, response, isSuccess}

}

export default useCreateChat