import useGetUser from "../../App/hooks/useGetUser"
import pierceWord from "../../utils/pieceWord"
import useNavUtils from "./hooks/useNavUtils"


const Navigation = ()=>{
const {user} = useGetUser()
const {handleGetToLoginPage,handleLogOut} = useNavUtils()

    return (
        <div className='bg-slate-800 text-white py-4 px-20 flex justify-between'>
        <div className="Brand ">
        Networking
        </div>

       {user &&  <div className="text-teal-400"> logged in as {user?.name} </div>}
        <div className="action w-[300px] flex justify-between"> 
        <p className="mr-4"> {user ?  user.email : "Sign up"}</p>
        {user && <p onClick={()=> handleLogOut()}>Logout</p>} 
        {!user && <p onClick={()=> handleGetToLoginPage()} className="">Login</p>}
    { user &&    <div className="w-[30px] h-[30px] rounded-full bg-white text-white text-sm text-center pt-1 font-black bg-sky-400">
        {pierceWord({name: user.name})}
        </div>}
        </div>
      </div>
    )
}

export default Navigation