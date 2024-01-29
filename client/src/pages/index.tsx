import Chat from "../components/Chat"
import ListUser from "../components/ListUser"

const Home = ()=>{
    return (
        <div className="w-[100%] flex justify-center"> 
        <div className="w-[90%] h-[auto] bg-slate-800 mt-10 rounded-md">
         
          <ListUser />
          <div className="w-[100%] h-[75vh] mt-5 flex justify-between px-10 py-4 rounded-md">
        <div className="all_chats w-[28%] h-[100%] bg-slate-700 rounded-md ">
            <Chat />
            <Chat />
            <Chat />
        </div>
        <div className="chats w-[70%] h-[100%] bg-slate-600 rounded-md ">
            <div className="nav w-[100%] h-[70px] bg-slate-700 flex text-xl text-white p-4">
                <div className="circle mr-4 w-[40px] bg-white h-[40px] rounded-full">

                </div>

                <div className="user">
                    Peter Parker
                </div>
            </div>

            <div className="w-[100%] h-[80%] bg-slate-900">

            </div>

            <form className="w-[100%] h-[10%] flex jutify-between items-center bg-slate-700">
            <input type="text" className="w-[85%] h-10 bg-slate-600 outline-none px-4 text-white  mx-4  py-2 rounded-full" />
            <button type="submit" className="w-[50px] h-[50px] rounded-full bg-green-200">Send</button>
            </form>

        </div>
            </div>
        </div>
        </div>
    )
}

export default Home