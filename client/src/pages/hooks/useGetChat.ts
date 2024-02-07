import { useQuery } from "react-query"
import { useState } from "react"
import { getChat } from "../../services/chats/chats"


const useGetChat = ()=>{
    const [isEnabled,setIsEnabled] =  useState(false)
    

    const  {data, isError, isLoading,refetch} = useQuery("get-users",getChat, {
        staleTime:20000,
        cacheTime: 20000, refetchOnWindowFocus: true,
        enabled: isEnabled
    })

    return {data, isError, isLoading, refetch, setIsEnabled}
}


export default useGetChat