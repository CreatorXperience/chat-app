import { useEffect } from "react";
import pierceWord from "../../utils/pieceWord"
import useGetUser from "../../App/hooks/useGetUser";


type TChat = {
  name: string,
  _id: string,
  email: string
} 

type TUser = {
  user: {
    password: string,
    email: string,
   _id: string,
   name: string,
   isChatCreated: boolean,
   online?: boolean 
  },
 displayChat:React.Dispatch<React.SetStateAction<TChat | null>>
 onlineUsers: {
  userId: string;
  socketId: string;
}[] |  undefined,
mutate: (userId: string) => void
}
const ListUser = ({user, displayChat, onlineUsers, mutate}: TUser)=>{

  const {user: loggedInUser} =  useGetUser()

  const handleChatClick = ()=> {
    displayChat(user)
    mutate(user._id)
  }

    return (
      <div>
       {user.isChatCreated ===false && user._id !== loggedInUser?._id ? <div className="user_container relative" onClick={()=> handleChatClick()}>
        <button className="w-[50px] h-[50px]  p-2 bg-blue-200 outline-dashed outline-offset-2   outline-blue-500 rounded-full mx-2">{pierceWord({name:user.name})}</button>
       {user.online? <div className={`w-[10px] h-[10px] bg-blue-500  absolute right-0 top-0 px-2 py-2 rounded-full`}> </div>: ""}
       </div>: ""}
      </div> 
    )
}

export default ListUser