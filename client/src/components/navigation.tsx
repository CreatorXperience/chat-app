import useGetUser from "../App/hooks/useGetUser"


const Navigation = ()=>{
const {user} = useGetUser()


    return (
        <div className='bg-slate-800 text-white py-4 px-20 flex justify-between'>
        <div className="Brand ">
        Networking
        </div>

       {user &&  <div className="text-teal-400"> logged in as {user?.name} </div>}
        <div className="action w-[100px] flex justify-between"> 
        <p>Signup</p>
        <p>Login</p>
        </div>
      </div>
    )
}

export default Navigation