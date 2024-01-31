import { useEffect, useState } from "react"
import Chat from "../components/Chat"
import ListUser from "../components/ListUser"
import useGetUsers from "../components/ListUser/hooks/useGetUsers"
import useCreateChat from "./hooks/useCreateChat"
import useGetChat from "./hooks/useGetChat"
import useGetAllUserChats from "./hooks/useGetAllChat"
import chatImage from  "../images/chatimage.png"


type TChat = {
        name: string,
        _id: string,
        email: string
}

const Home = ()=>{
    let {data:users} = useGetUsers()
    const {mutateChat,response,} =  useCreateChat()
    const {data:chats, refetch} =  useGetChat()
    const [selectChat, setselectChat]=  useState<TChat | null>(null)
    

    
    const ids = chats && chats.map((data: {members: string[]})=> {
        return data.members && data.members[1]
    })

    const {response:data, setChat} = useGetAllUserChats()


    useEffect(()=>{
    if(ids)
    setChat(ids)
    },[chats])

    useEffect(()=>{
        if(response)
  refetch()
    },[response])


    console.log(chats)

    return (
        <div className="w-[100%] flex justify-center"> 
        <div className="w-[90%] h-[auto] bg-slate-800 mt-10 rounded-md">
         <div className="w-[100%] scroll-auto flex mt-4 px-10  ">
         {users && users.map((user: {_id: string, email: string, name: string, password: string})=>{
             return   <ListUser key={user._id} user={user} mutateUser={mutateChat}  />
            })}
            </div>
          <div className="w-[100%] h-[75vh] mt-5 flex justify-between px-10 py-4 rounded-md">
        <div className={`all_chats w-[28%] h-[100%] bg-slate-700 rounded-md`}>
    {data && data.map((item: {name: string, email: string,_id: string})=>{
        return <Chat key={item &&item._id} data={item} selectChat={setselectChat}/>
    })}
        </div>
       {selectChat &&  <div className={`chats ${selectChat? "w-[70%]": "w-[0px]"} h-[100%] bg-slate-600 rounded-md`}>
            <div className="nav w-[100%] h-[70px] bg-slate-700 flex text-xl text-white p-4">
                <div className="circle mr-4 w-[40px] bg-white h-[40px] rounded-full">

                </div>

                <div className="user">
               {selectChat.name}
                </div>
            </div>

            <div className="w-[100%] h-[80%] bg-slate-900">

            </div>

            <form className="w-[100%] h-[10%] flex jutify-between items-center bg-slate-700">
            <input type="text" className="w-[85%] h-10 bg-slate-600 outline-none px-4 text-white  mx-4 py-2 rounded-full"   placeholder="message"/>
            <button type="submit" className="w-[50px] h-[50px] rounded-full bg-green-200"><i className="fa-regular fa-paper-plane"></i></button>
            </form>

        </div>}

        {!selectChat  ? <div className="container flex justify-center flex-col items-center w-[100%] h-[100%] bg-slate-900"> 
   <img src={chatImage} />
   <div className="text-white text-3xl ">Chat App</div>
   <div className="text-white text md py-4">Send and recieve messages online</div>
        </div>: ""}
            </div>
        </div>
        </div>
    )
}

export default Home