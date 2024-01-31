type TChat = {
    data: {
        name: string,
        _id: string,
        email: string
    }

    selectChat: React.Dispatch<React.SetStateAction<{name: string,email: string, _id: string} | null>>
}
const Chat = ({data, selectChat}: TChat)=>{
    return (
        <div className="flex w-[100%] mt-4" onClick={()=> selectChat(data)}> 
            {data && <div className="circle w-[40px] bg-white h-[40px] rounded-full mx-4 my-2"></div>}
        {data &&   <div className="message my-2">
                <div className="name text-xl text-white">
                  {data&& data.name}
                </div>

                <div className="last_message text-sm text-gray-400">You are connected now</div>
            </div>}


    { !data && 
        <div className="w-[100%] h-[80px] bg-slate-800 flex py-4 px-4"> 
        <i className="fa-solid fa-circle-exclamation text-yellow-400 text-3xl mr-2"></i>
        <p className="text-white py-2 text-xl">You are currently offline</p>
        </div>
    }
        </div>
    )
}

export default Chat