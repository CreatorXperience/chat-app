import { useQuery } from "react-query"
import axiosInstance from "../../utils/axiosInstance"
import { ENDPOINT } from "../../constants/endpoints"
import { toast } from "react-toastify"
import { useState } from "react"


const useGetChat = ()=>{
    const [isEnabled,setIsEnabled] =  useState(false)
    const getChat = async ()=>{
        let token  = localStorage.getItem("userinfo")
        if(token){
            let parsedToken =  JSON.parse(token)

        try{
            let response = await axiosInstance.get(`${ENDPOINT.chats}`,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': parsedToken.token
                }
            })
            return  response.data
        }catch(e){
            toast("couldn't get chats")
            return [{members: null, error: e}]
        }
    }
    }

    const  {data, isError, isLoading,refetch} = useQuery("get-users",getChat, {
        staleTime:20000,
        cacheTime: 20000, refetchOnWindowFocus: true,
        enabled: isEnabled
    })

    return {data, isError, isLoading, refetch, setIsEnabled}
}


export default useGetChat