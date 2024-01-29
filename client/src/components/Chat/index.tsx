const Chat = ()=>{
    return (
        <div className="flex w-[100%] mt-4"> 
            <div className="circle w-[40px] bg-white h-[40px] rounded-full mx-4 my-2"></div>
            <div className="message my-2">
                <div className="name text-xl text-white">
                    Peter Parker
                </div>

                <div className="last_message text-sm text-gray-400">You are connected now</div>
            </div>
        </div>
    )
}

export default Chat