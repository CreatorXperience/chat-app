import { useCallback, useMemo, useState } from "react";
import router  from "./routers/router";
import { RouterProvider } from "react-router-dom";
import "./Tailwind.css"
import Navigation from "./components/navigation";
import authContext from "./context/authProvider";
import isSignupContext from "./context/signupProvider";
import { QueryClientProvider, QueryClient} from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";
import userInfoContext from "./context/userInfoProvider";


let client =  new QueryClient()
function App() {
  const [isUserSignup,setIsSignUp] = useState(true)
  let  [userInfo, setUserInfo] =  useState({
    name: "",
    email: "",
    _id: ""
  })



  let setIsSignupCallback =  useCallback(setIsSignUp, [])

  let isSignupValue = useMemo(()=>{
    return {isUserSignup,setIsSignupCallback}
  },[isUserSignup])
  

  let userInfoValue =  useMemo(()=>{
    return  {userInfo, setUserInfo}
  },[userInfo])


  return (
    <QueryClientProvider client={client}>
    <div className="w-[100%] h-[100vh] bg-slate-900">

    <userInfoContext.Provider value={userInfoValue}>
    <isSignupContext.Provider value={isSignupValue}>
    <Navigation />
    <RouterProvider router={router} />
    </isSignupContext.Provider>
      </userInfoContext.Provider>
    </div>
    {/* <ReactQueryDevtools position="bottom-right" initialIsOpen={false} /> */}
    </QueryClientProvider>
  )
}

export default App;
