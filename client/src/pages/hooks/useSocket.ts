import { useEffect, useMemo, useState } from "react"
import { Socket, io } from "socket.io-client"

type TUser = {
    name: string,
    email: string,
    _id: string,
}

type TChat = {
    name: string,
    _id: string,
    email: string
} 

const useSocket = (user:  TUser | null, setSocketMessages: React.Dispatch<React.SetStateAction<{
    chatId: string;
    text: string;
    senderId: string;
    from: string;
}[]>> )=> {
    const [selectChat, setselectChat]=  useState<TChat | null>(null)
    const [socket, setsocket] =  useState<Socket>()
    const [onlineUsers, setOnlineUsers] = useState<{userId: string, socketId: string}[]>()
    const memoizeUser =  useMemo(()=>{
        return user
    }, [ user])

    useEffect(()=>{
        const IO =    io("http://localhost:8080")
        setsocket(IO)
    
        return ()=>{ 
            IO.disconnect()
        }
        },[memoizeUser])

        useEffect(()=>{
            if(socket)
            socket?.emit("add", memoizeUser?._id)
            socket?.on("online-users",  (onlineUsers: {userId: string, socketId: string}[])=> {
                setOnlineUsers(onlineUsers)
            })
            return ()=>{
                socket?.off("online-users")
            }
        },  [memoizeUser?._id, socket])


        useEffect(()=> {
            if(socket){
                socket.on("getMessage",  (res: {from: string, message: string, to:string, chatId:string})=> {
                    let obj = {
                        from: res.from,
                        text: res.message,
                        senderId: res.to,
                        chatId: res.chatId
                    }
                  
                        setSocketMessages((message) => [...message, obj])
                 
                })

                return ()=> {
                    socket.off("getMessage")
                }
            }

        }, [socket, selectChat])




   
    

        return {socket, onlineUsers,selectChat, setselectChat}
}

export default useSocket