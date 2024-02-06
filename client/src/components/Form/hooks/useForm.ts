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


      const {mutateUser,isSuccess,registerResponse,registerError} =  useRegisterUser()
      const {isLoading:loginLoading,mutateUserLogin, loginResponse} = useLoginUser()

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
                    userInfo.name = userInfo.name.trimEnd()
                  mutateUser(userInfo)
                   return  
                }
                let existingUser = {email:userInfo.email, password: userInfo.password}
                mutateUserLogin(existingUser)
            }

            return {isOnSignupPage, userInfo,handleSetIsSignup,handleInputEmail,handleInputName,handleInputPass, handleSubmit,isSuccess,loginResponse, loginLoading,registerResponse,registerError}
}

export default useForm