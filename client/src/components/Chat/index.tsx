import useGetUser from "../../App/hooks/useGetUser"
import pierceWord from "../../utils/pieceWord"

type TChat = {
    data: {
        name: string,
        _id: string,
        email: string
        isChatCreated?: boolean
    }

    selectChat?: React.Dispatch<React.SetStateAction<{name: string,email: string, _id: string} | null>>
}
const Chat = ({data, selectChat}: TChat)=>{
    const {user} =  useGetUser()
    return (
        <div> 
{data.isChatCreated === true &&  user?._id !== data._id && 
        <div className="flex w-[100%] relative mt-4" onClick={()=> ""}> 
            {data && <div className="circle w-[40px] outline-dashed outline-offset-2   outline-blue-500 bg-blue-200 flex justify-center items-center bg-white h-[40px] rounded-full mx-4 my-2">{pierceWord({name: data&& data.name})}</div>}
                    {data &&     <div className="w-[10px] h-[10px] bg-blue-500 absolute left-12 top-2 px-2 py-2 rounded-full"> </div>}
        {data &&   <div className="message my-2">
                <div className="name text-xl text-white">
                  {data&& data.name}
                </div>

                <div className="last_message text-sm text-gray-400">You are connected now</div>
            </div>}


   
        </div>}
        {/* { data.isChatCreated === false &&  user?._id !== data._id &&
        <div className="w-[100%] h-[80px] bg-slate-800 flex py-4 px-4"> 
        <i className="fa-solid fa-circle-exclamation text-yellow-400 text-3xl mr-2"></i>
        <p className="text-white py-2 text-xl">You have no chat</p>
        </div>
    } */}
    </div>
    )
}

export default Chat