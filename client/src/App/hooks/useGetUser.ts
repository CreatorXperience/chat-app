import {  useEffect, useState } from "react"

type TUser = {
    name: string,
    email: string,
    _id: string,
}
const useGetUser = ()=>{
    let [user, setUser] = useState<null | TUser>(null)
    useEffect(()=>{
        let user =  localStorage.getItem("userinfo")
        if(user){
           let parsed =  JSON.parse(user)
            setUser(parsed)
            }
    },[])
   
return {user}
}

export default useGetUser