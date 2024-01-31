import { useQueries } from "react-query"
import axiosInstance from "../../utils/axiosInstance"
import { ENDPOINT } from "../../constants/endpoints"
import { useState } from "react"


const fetchAllChats = async(id: string)=>{
    if(id)
    try{
       let response =  await axiosInstance.get(`${ENDPOINT.allUserChats}/${id}`)
        return response.data
    }
    catch(e){
        return e
    }
}

const useGetAllUserChats = ()=>{
    const [chat, setChat] = useState<[string]>([""])
    const results = useQueries(chat.map((id)=>{
        return {queryKey: ["chat", id], queryFn: () => fetchAllChats(id), enabled: !!chat}
    }))

    let response = results.map((data)=>{
      return  data.data
    })

    return {response, setChat}
}

export default useGetAllUserChats