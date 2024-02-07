import { useQuery } from "react-query"
import { ENDPOINT } from "../../constants/endpoints"
import axiosInstance from "../../utils/axiosInstance"
import { useState } from "react"


const useGetMessages = (data:{chatId: string, from: string, senderId: string, text: string}[], setData: React.Dispatch<React.SetStateAction<{
    chatId: string;
    text: string;
    senderId: string;
    from: string;
}[]>>
    )=> {
    const [chatId, setChatId] =  useState<string>()
    const [messages, setMesssages] =  useState<{
        chatId: string;
        text: string;
        senderId: string;
        from: string;
    }[]>()

let fetchMessages = async(chatId: string)=> {
    try{


      let userInfo  = localStorage.getItem("userinfo")
      if(userInfo){
          let parsedUserInfo =  JSON.parse(userInfo)

        let response = await axiosInstance.get(`${ENDPOINT.messages}/${chatId}`, {
            headers: {
                Authorization: parsedUserInfo.token
            }
        })
        console.log(response.data)
        return response.data
    }
    }
    catch(e){
        console.log(e)
    }

}


let {isError, isSuccess, refetch,isFetching} = useQuery(["messages", chatId],() =>  fetchMessages(chatId as string), {
    enabled: !!chatId,
    cacheTime: 30000,
    staleTime: 30000,
    refetchOnWindowFocus: false,
    onSuccess: (data)=> {
        setData(data)
        // setMesssages(data)
    },
    isDataEqual(oldData, newData) {
        if(oldData === newData){
            console.log("data is equals")
            return true
        }
        return false
    },
}) 


console.log(chatId)
return {messages , data, isError,isSuccess, setChatId,isFetching, setData}
}

export default useGetMessages