import { useMutation } from "react-query"
import axiosInstance from "../../utils/axiosInstance"
import { ENDPOINT } from "../../constants/endpoints"
import { useState } from "react"

type TChatPayload = {
chatId: string,
senderId: string,
text: string
}
const useSendMessage = ()=> {
    const [messageResponse, setMessageResponse] =  useState()
const postMessage = async(payload: TChatPayload)=> {
    
      let userInfo  = localStorage.getItem("userinfo")
    if(userInfo){
        let parsedUserInfo =  JSON.parse(userInfo)

        try{

            let response =  await axiosInstance.post(`${ENDPOINT.messages}`,payload, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": parsedUserInfo.token
                }
            })
            
            
            return response.data
        }
        catch(e){
        console.log(e)
        }

}
}

const  {isError, isLoading, mutate} =  useMutation("messages",  postMessage)

const mutateMessage = (message: TChatPayload)=>{
    
    mutate(message, {
        onError: ()=>{
            console.log("an error occured while saving message")
        },

        onSuccess: (data)=> {
            setMessageResponse(data)
        }
    })
}

return {isError,isLoading, mutateMessage}
}

export default useSendMessage