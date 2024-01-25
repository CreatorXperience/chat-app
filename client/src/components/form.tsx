import { useContext } from "react"
import isSignupContext from "../context/signupProvider"

const Formic  = ()=>{

    const isSignup =  useContext(isSignupContext)
const handleSetIsSignup = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
e.preventDefault()
if(isSignup)
isSignup.setIsSignupCallback(!isSignup.isUserSignup)
    }
        return (
        <div className="form-container flex justify-center  mt-[200px]">
        <div className="form-section h-[450px] w-[22%] bg-slate-800 rounded-md m-0">
          <div className="title text-3xl text-white text-center py-8"> LOGIN </div>
            <form className="form  w-[100%] flex  flex flex-col  items-center">
                {isSignup && isSignup.isUserSignup && <input  className="w-[80%]  py-2 px-6 rounded-sm" type="text" placeholder="Name" />}
            <input  className="w-[80%] my-4 py-2 px-6 rounded-sm" type="email" placeholder="Email" /> 
            <input className="w-[80%] py-2 px-6 rounded-sm" type="text" placeholder="Password" />
            <button className="w-[80%] mt-5 py-2 px-6 rounded-sm bg-cyan-600 text-white" type="submit">{isSignup && isSignup.isUserSignup? "Register?": "Login"}</button>
            <a className="text-white pt-10" href="#"> {isSignup && isSignup.isUserSignup ? "Already have an account?": "Don'thave an account?"}  <span className="text-cyan-600" onClick={(e)=> handleSetIsSignup(e)}>{isSignup && isSignup.isUserSignup? "Sign in": "Sign up"}</span></a>
        </form>
      </div>
        </div>
    )
}

export default Formic