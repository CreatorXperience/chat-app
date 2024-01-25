import { useCallback, useMemo, useState } from "react";
import router  from "./routers/router";
import { RouterProvider } from "react-router-dom";
import "./Tailwind.css"
import Navigation from "./components/navigation";
import authContext from "./context/authProvider";
import isSignupContext from "./context/signupProvider";

function App() {
  const [isUserSignup,setIsSignUp] = useState(true)
  

  let setIsSignupCallback =  useCallback(setIsSignUp, [])

  let isSignupValue = useMemo(()=>{
    return {isUserSignup,setIsSignupCallback}
  },[isUserSignup])
  
  return (
    <div className="w-[100%] h-[100vh] bg-slate-900">

    <authContext.Provider value={null}>
    <isSignupContext.Provider value={isSignupValue}>
    <Navigation />
    <RouterProvider router={router} />

    </isSignupContext.Provider>
      </authContext.Provider>
    </div>
  )
}

export default App;
