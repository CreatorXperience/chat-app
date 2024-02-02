import { useCallback, useEffect, useMemo, useState } from "react"
import useGetAllUserChats from "./useGetAllChat"
import useGetChat from "./useGetChat"
import useCreateChat from "./useCreateChat"
import useGetUsers from "../../components/ListUser/hooks/useGetUsers"
import useGetUser from "../../App/hooks/useGetUser"
import useSocket from "./useSocket"



type TChat = {
    name: string,
    _id: string,
    email: string
} 


const useStartUp = ()=>{

    let {data:users} = useGetUsers()
    const {mutateChat,response,} =  useCreateChat()
    const {data:chats, refetch,setIsEnabled} =  useGetChat()
    const [selectChat, setselectChat]=  useState<TChat | null>(null)
    const {user:loggedInUser} = useGetUser()
    const {socket, onlineUsers} =  useSocket(loggedInUser)
    console.log(socket, onlineUsers)
    const {response:data, setChatId} = useGetAllUserChats()
    const [ids, setIds] =  useState<Array<string>>([])
    const [activeUser, setActiveUser] = useState<[]>()
    const [message, setMessage] =  useState<string>()

   
    // console.log(users)
    // console.log(chats)



   
    useEffect(()=> {
        let usersId:Array<string> = [] 
        chats && chats.map((data: {members: string[]}, i: number)=> {
           return data.members && data.members.map((item2: any)=> {
                if(item2 !== loggedInUser?._id){
                    usersId= [...usersId, item2]
                    return item2
                }
            }).filter((item: any) => item !== undefined)
            }).filter((item: any) => item !== undefined)
    
            setIds(usersId)
    }, [chats])


    // console.log(ids)


    const memoizedId = useMemo(()=>{
        return ids
    },[ids])



    useEffect(()=>{
    if(memoizedId && ids){
    setChatId(memoizedId)
    }
    }, [chats, ids, memoizedId,setChatId])

 

    useEffect(()=>{
        if(response)
        refetch()
    },[response, refetch])



    const filterUsers = (users:any)=>{
        let newUsers =   users.map((item:any, index:number)=>  {
          if(!ids.includes(item._id)){
            let newItem = {...item,  isChatCreated:  false}
              return newItem
          }
          return {...item, isChatCreated: true}
        })
  
        return  newUsers
       
      }


      const handleUpdateMessage =  (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setMessage(e.target.value)
      }

      const handleSendMessage = (e: React.FormEvent, userId: string)=> {
        e.preventDefault()
        mutateChat(userId)
      }


      const  filterUsersCallback = useCallback(filterUsers, [ids, users])


      const getOnlineUsers = (users: any)=> {
            let online = onlineUsers?.map((on)=> {
                return on.userId
            })
                
            if(online){
               return users.map((item:any)=> {
                    if(online && online.includes(item._id)){
                        let userOnline = {...item, online: true}
                        return userOnline
                    }
                    return item
                })
            }
       }
      

       const getOnlineUsersCallback = useCallback(getOnlineUsers, [onlineUsers])
     

    useEffect(()=>{
if(users && memoizedId){
    let onlineUsers = getOnlineUsersCallback(users)
    if(onlineUsers){
        let user = filterUsersCallback(onlineUsers)
        setActiveUser(user)
    }
    // setNewUsers(user)
    // // setActiveUser(onlineUsers)
}
else {
    setIsEnabled(true)
}

    }, [users,filterUsersCallback,getOnlineUsersCallback, loggedInUser?._id,setIsEnabled,memoizedId])






   const  filterData = ()=>{
    console.log(data)
  let currentChat = chats.filter((item: any)=> item &&  item.members[0] !== loggedInUser?._id)
setIds(currentChat)
   }


   return {data,filterData, selectChat, setselectChat, mutateChat, onlineUsers, activeUser, handleSendMessage, setMessage, handleUpdateMessage}
}


export default useStartUp