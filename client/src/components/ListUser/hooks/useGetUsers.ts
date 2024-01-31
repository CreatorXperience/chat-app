
import axiosInstance from "../../../utils/axiosInstance"
import { ENDPOINT } from "../../../constants/endpoints"
import { useQuery } from "react-query"
import { useState } from "react"
import { toast } from "react-toastify"


const useGetUsers = ()=>{ 
    const getUsers = async ()=>{
        try{
            let response =  await axiosInstance.get(`${ENDPOINT.users}`)
            return response.data
        }
        catch(e){
            toast("no internet connection")
            return  null
        }
    }
    const {data, isError, isLoading} =  useQuery("users", getUsers, {
        staleTime: 5000,
        cacheTime: 5000,
        enabled: true,
        refetchOnWindowFocus: true,
    })



    return {data, isError}
}


export default useGetUsers