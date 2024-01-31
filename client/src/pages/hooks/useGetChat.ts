import { useQuery } from "react-query"
import axiosInstance from "../../utils/axiosInstance"
import { ENDPOINT } from "../../constants/endpoints"
import { toast } from "react-toastify"
import { useState } from "react"

const useGetChat = ()=>{
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
        staleTime:2000,
        cacheTime: 2000, refetchOnWindowFocus: true
    })

    return {data, isError, isLoading, refetch}
}


export default useGetChat