import { useContext } from "react"
import userInfoContext from "../context/userInfoProvider"

const Navigation = ()=>{
  const userContext = useContext(userInfoContext)
    return (
        <div className='bg-slate-800 text-white py-4 px-20 flex justify-between'>
        <div className="Brand ">
        Networking
        </div>

        <div> logged in as {userContext ? userContext.userInfo?.name : "nobody" } </div>
        <div className="action w-[100px] flex justify-between"> 
        <p>Signup</p>
        <p>Login</p>
        </div>
      </div>
    )
}

export default Navigation