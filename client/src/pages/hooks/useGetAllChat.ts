import { useQueries } from "react-query"
import { useState } from "react"
import { fetchAllChats } from "../../services/chats/chats"




const useGetAllUserChats = ()=>{
    const [chatId, setChatIds] = useState<Array<string>>([])
    const results = useQueries(chatId.map((id)=>{
        return {queryKey: ["chat", id], queryFn: () => fetchAllChats(id), enabled: !!chatId}
    }))

    let response = results.map((data)=>{
      return  data.data
    })

    return {response, setChatIds}
}

export default useGetAllUserChats