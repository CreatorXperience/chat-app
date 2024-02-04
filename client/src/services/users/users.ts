import { toast } from "react-toastify"
import { ENDPOINT } from "../../constants/endpoints"
import axiosInstance from "../../utils/axiosInstance"

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


export default getUsers