import { toast } from "react-toastify"
import axiosInstance from "../../utils/axiosInstance"
import { ENDPOINT } from "../../constants/endpoints"

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



const getChat = async ()=>{
    let userInfo  = localStorage.getItem("userinfo")
    if(userInfo){
        let parsedToken =  JSON.parse(userInfo)

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


export {createChat, fetchAllChats, getChat}