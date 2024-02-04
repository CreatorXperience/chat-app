import { useMutation } from "react-query"
import { useState } from "react"
import { createChat } from "../../services/chats/chats"

const useCreateChat = ()=>{
    const [response, setResponse] = useState()

    const {data, mutate, isLoading, isError, isSuccess} =  useMutation("create-chats", createChat)


    const mutateChat = (userId: string)=>{
        mutate(userId, {onSuccess: (data)=>{
         
        setResponse(data)
        }})
    }
    return {data, mutateChat, isLoading, isError, response, isSuccess}

}

export default useCreateChat