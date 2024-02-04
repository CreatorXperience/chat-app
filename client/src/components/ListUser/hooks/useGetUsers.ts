import { useQuery } from "react-query"
import getUsers from "../../../services/users/users"


const useGetUsers = ()=>{ 
   
    const {data, isError} =  useQuery("users", getUsers, {
        staleTime: 5000,
        cacheTime: 5000,
        enabled: true,
    })



    return {data, isError}
}


export default useGetUsers