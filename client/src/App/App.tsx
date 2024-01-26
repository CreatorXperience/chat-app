import { useCallback, useEffect, useMemo, useState } from "react";
import {  useNavigate, Outlet } from "react-router-dom";
import Navigation from "../components/navigation";
import isUserOnSignUpPageContext from "../context/signupProvider";
import { QueryClientProvider, QueryClient} from "react-query";
import userInfoContext from "../context/userInfoProvider";
import { ToastContainer } from "react-toastify";
import useGetUser from "./hooks/useGetUser";



let client =  new QueryClient()

function App() {
  const navigate =  useNavigate()
  
  const [isUserOnSignUpPage,setIsOnSignUpPage] = useState(true)
  
  let {user} =  useGetUser()
  

  let  [userInfo, setUserInfo] =  useState({
    name: "",
    email: "",
    _id: ""
  })

  let setIsOnSignupPageCallback =  useCallback(setIsOnSignUpPage, [])

  let isSignupValue = useMemo(()=>{
    return {isUserOnSignUpPage,setIsOnSignupPageCallback}
  },[isUserOnSignUpPage])
  

  let userInfoValue =  useMemo(()=>{
    return  {userInfo, setUserInfo}
  },[userInfo])




useEffect(()=>{
  if(user){
    console.log(user)
  navigate("/me")
    }
    else{
      console.log(user)
navigate("/register")
    }
},[user])


  return (
    <QueryClientProvider client={client}>
    <div className="w-[100%] h-[100vh] bg-slate-900">
    <userInfoContext.Provider value={userInfoValue}>
    <isUserOnSignUpPageContext.Provider value={isSignupValue}>
    <ToastContainer />
    <Navigation />
    <Outlet />
    </isUserOnSignUpPageContext.Provider>
      </userInfoContext.Provider>
    </div>

    </QueryClientProvider>
  )
}

export default App;
