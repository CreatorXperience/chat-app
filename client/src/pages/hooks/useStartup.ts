import { useCallback, useEffect, useMemo, useState } from "react"
import useGetAllUserChats from "./useGetAllChat"
import useGetChat from "./useGetChat"
import useCreateChat from "./useCreateChat"
import useGetUsers from "../../components/ListUser/hooks/useGetUsers"
import useGetUser from "../../App/hooks/useGetUser"
import useSocket from "./useSocket"
import useSendMessage from "./useSendMessage"
import { toast } from "react-toastify"
import useGetMessages from "./useGetMessages"


const useStartUp = ()=>{
    const [main, setMain] = useState<{chatId: string, text: string, senderId: string, from: string}[]>([])
    let {data:users} = useGetUsers()
    const {mutateChat,response,} =  useCreateChat()
    const {data:chats, refetch,setIsEnabled} =  useGetChat()
    const {user:loggedInUser} = useGetUser()
    const { messages, setChatId, isFetching:isMessageFetching} =  useGetMessages(main,setMain)
    const {socket, onlineUsers, selectChat, setselectChat} =  useSocket(loggedInUser, setMain)
    const {response:data, setChatIds} = useGetAllUserChats()
    const [ids, setIds] =  useState<Array<string>>([])
    const [activeUser, setActiveUser] = useState< {_id: string, email: string, name: string, password: string, isChatCreated: boolean}[]>()
    const [message, setMessage] =  useState<string>()
    const {mutateMessage} =  useSendMessage()

  

let getChatIds= (chats: any)=> {
    let usersId:Array<string> = [] 
if(chats)
    for (let i = 0; i < chats.length; i++) {
        const members = chats[i].members;
        if(members){
            const matchingValue = members.filter((memberId:any)=> memberId !== loggedInUser?._id);
            usersId = [...usersId, ...matchingValue]
        }
      }
 
        return usersId
   
}

let getSingleChatId = (chats:any, selectedItemId: string)=> {
    let chatId:Array<string> = []
    if(chats)
    for (let i = 0; i < chats.length; i++) {
        const members = chats[i].members;
        if(members){
            const matchingValue = members.some((memberId:any)=> memberId === selectedItemId);
            if(matchingValue)
             chatId = [...chatId, chats[i]._id]
        }
      }
 

  return chatId[0]
}


const getSingleChatIdMemo = useMemo(()=> getSingleChatId(chats, selectChat?._id as string), [chats,  selectChat, messages ])


const getChatIdsMemo = useMemo(()=> getChatIds(chats), [chats])




    useEffect(()=> {
       setIds(getChatIdsMemo) 
    }, [chats, getChatIdsMemo])

    




    const memoizedId = useMemo(()=>{
        return ids
    },[ids])



    useEffect(()=>{
    if(memoizedId && ids){
    setChatIds(memoizedId)
    }
    }, [chats, ids, memoizedId,setChatIds])



    useEffect(()=> {
    setChatId(getSingleChatIdMemo)
    }, [getSingleChatIdMemo])

 

    useEffect(()=>{
        if(response)
        refetch()
    },[response, refetch])



    const filterUsers = (users:any)=>{
        let newUsers =   users.map((item:any)=>  {
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

      const handleSendMessage = (e: React.FormEvent, userId: string,)=> {
        e.preventDefault()

      if(chats){    
        if(message &&  selectChat?._id)
        mutateMessage({
        chatId: getSingleChatIdMemo,
        text: message,
        senderId: selectChat?._id
        })



        setMain((prev)=> [...prev, {senderId: selectChat?._id as string,from: loggedInUser?._id as string,text:message as string,chatId: getSingleChatIdMemo}])

        socket?.emit("message", {senderId: selectChat?._id,from: loggedInUser?._id,message,chatId: getSingleChatIdMemo})
        
    } 

    toast("couldn't find chat")
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
}
    else {
    setIsEnabled(true)
    }
    }, [users,filterUsersCallback,getOnlineUsersCallback, loggedInUser?._id,setIsEnabled,memoizedId])



   return {data, selectChat, setselectChat, mutateChat,isMessageFetching, onlineUsers, activeUser, handleSendMessage, setMessage, handleUpdateMessage,socket,main,loggedInUser, setChatId, getSingleChatIdMemo}
}


export default useStartUp