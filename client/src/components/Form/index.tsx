import { useContext } from "react"
import useForm from "./hooks/useForm"
import userInfoContext from "../../context/userInfoProvider"

const Formic  = ()=>{

const {handleInputEmail,handleInputName,handleInputPass,handleSetIsSignup,isOnSignupPage,userInfo, handleSubmit, data} =  useForm()

    const userContext =  useContext(userInfoContext)
    userContext?.setUserInfo(data)
    
        return (
        <div className="form-container flex justify-center  mt-[200px]">
            <div className="form-section h-[450px] w-[22%] bg-slate-800 rounded-md m-0">
                <div className="title text-3xl text-white text-center py-8"> {isOnSignupPage && isOnSignupPage.isUserSignup? "REGISTER?": "Welcome"}  </div>
                    <form className="form  w-[100%] flex  flex flex-col  items-center" onSubmit={(e)=>{handleSubmit(e)}}>
                        {isOnSignupPage && isOnSignupPage.isUserSignup && <input  className="w-[80%]  py-2 px-6 rounded-sm" type="text" placeholder="Name" onChange={(e)=> handleInputName(e)} />}
                    <input  className="w-[80%] my-4 py-2 px-6 rounded-sm" type="email" placeholder="Email" onChange={(e)=> handleInputEmail(e)}/> 
                <input className="w-[80%] py-2 px-6 rounded-sm" type="password" placeholder="Password"  onChange={(e)=> handleInputPass(e)}/>
            <button className="w-[80%] mt-5 py-2 px-6 rounded-sm bg-cyan-600 text-white" type="submit">{isOnSignupPage && isOnSignupPage.isUserSignup? "Register?": "Login"}</button>
        <a className="text-white pt-10" href="#"> {isOnSignupPage && isOnSignupPage.isUserSignup ? "Already have an account?": "Don'thave an account?"}  <span className="text-cyan-600" onClick={(e)=> handleSetIsSignup(e)}>{isOnSignupPage && isOnSignupPage.isUserSignup? "Sign in": "Sign up"}</span></a>
                </form>
      </div>

      <div className={`image form-section w-[100%] h-[450px] w-[22%] bg-slate-800 rounded-md m-0 `}>
   
      </div>
        </div>
    )
}

export default Formic