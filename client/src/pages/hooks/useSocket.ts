import { useEffect, useMemo, useState } from "react"
import { Socket, io } from "socket.io-client"

type TUser = {
    name: string,
    email: string,
    _id: string,
}
const useSocket = (user:  TUser | null)=> {

    const [socket, setsocket] =  useState<Socket>()
    const [onlineUsers, setOnlineUsers] = useState<[{userId: string, socketId: string}]>()

    const memoizeUser =  useMemo(()=>{
        return user
    }, [ user])

    useEffect(()=>{
        const IO =    io("http://localhost:8080", {autoConnect: true})
        setsocket(IO)

        return ()=>{ 
            IO.disconnect()
        }
        },[memoizeUser])

        useEffect(()=>{
            if(socket)
            socket?.emit("add", memoizeUser?._id)
            socket?.on("online-users",  (onlineUsers: [{userId: string, socketId: string}])=> {
                setOnlineUsers(onlineUsers)
            })

            return ()=>{
                socket?.off("online-users")
            }
        },  [memoizeUser?._id, socket])
    

        return {socket, onlineUsers}
}

export default useSocket