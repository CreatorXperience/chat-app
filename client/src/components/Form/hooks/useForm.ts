import { useContext, useState } from "react"
import isUserOnSignUpPageContext from "../../../context/signupProvider"
import useRegisterUser from "./useRegisterUser"
import useLoginUser from "./useLoginUser"

const useForm = ()=>{
    const isOnSignupPage =  useContext(isUserOnSignUpPageContext)
    

    let  [userInfo, setUserInfo] =  useState({
        name: "",
        email: "",
        password: ""
      })


      const {data,mutateUser,isSuccess} =  useRegisterUser()
      const {data:loginResponse,isError:loginError, isSuccess: loginSuccess,isLoading:loginLoading,mutateUserLogin} = useLoginUser()

    const handleSetIsSignup = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        e.preventDefault()
        if(isOnSignupPage){
            isOnSignupPage.setIsOnSignupPageCallback(!isOnSignupPage.isUserOnSignUpPage)
        }
            }
        
            const handleInputName  = (e:React.ChangeEvent<HTMLInputElement>)=>{
                e.preventDefault()
        
                setUserInfo((user)=> {
                    return {...user, name: e.target.value}
                })   
            }
        
            const handleInputEmail = (e:React.ChangeEvent<HTMLInputElement>)=>{
                e.preventDefault()
        
                setUserInfo((user)=> {
                    return {...user, email: e.target.value}
                })   
            }
        
            const handleInputPass = (e:React.ChangeEvent<HTMLInputElement>)=>{
                e.preventDefault()
        
                setUserInfo((user)=> {
                    return {...user, password: e.target.value}
                })   
            }

            const handleSubmit = (e:  React.FormEvent<HTMLFormElement>)=>{
                e.preventDefault()
                if(isOnSignupPage?.isUserOnSignUpPage){
                    mutateUser(userInfo)
                   return  isOnSignupPage?.setIsOnSignupPageCallback(!isOnSignupPage.isUserOnSignUpPage)
                }
                let existingUser = {email:userInfo.email, password: userInfo.password}
                mutateUserLogin(existingUser)
            }

            return {isOnSignupPage, userInfo,handleSetIsSignup,handleInputEmail,handleInputName,handleInputPass, handleSubmit,data,isSuccess,loginResponse, loginError, loginLoading,loginSuccess}
}

export default useForm