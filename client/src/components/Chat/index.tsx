import useGetUser from "../../App/hooks/useGetUser"
import pierceWord from "../../utils/pieceWord"

type TChat = {
    data: {
        name: string,
        _id: string,
        email: string
        isChatCreated?: boolean
        online?: boolean;
    }

    selectChat: React.Dispatch<React.SetStateAction<{name: string,email: string, _id: string} | null>>,
    chats:  {
        chatId: string;
        text: string;
        senderId: string;
        from: string;
    }[]
}
const Chat = ({data, selectChat, chats}: TChat)=>{
    const {user} =  useGetUser()
    return (
        <div> 
{data.isChatCreated === true &&  user?._id !== data._id && 
        <div className="flex w-[100%] relative mt-4" onClick={()=> selectChat(data)}> 
            {data && <div className="circle w-[40px] outline-dashed outline-offset-2   outline-blue-500 bg-blue-200 flex justify-center items-center bg-white h-[40px] rounded-full mx-4 my-2">{pierceWord({name: data&& data.name})}</div>}
            {data && data.online ?   <div className="w-[10px] h-[10px] bg-blue-500 absolute left-12 top-2 px-2 py-2 rounded-full"> </div>: ""}
                {data &&   <div className="message my-2">
                <div className="name text-xl text-white">
                  {data&& data.name}
                </div>

                 {/* <div className="last_message text-sm text-gray-400">{chats[chats.length-1]?.text}</div> */}
            </div>}
        </div>}
    </div>
    )
}

export default Chat