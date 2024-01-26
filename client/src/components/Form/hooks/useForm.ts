import { useContext, useState } from "react"
import isSignupContext from "../../../context/signupProvider"
import useRegisterUser from "./useRegisterUser"

const useForm = ()=>{
    const isOnSignupPage =  useContext(isSignupContext)


    let  [userInfo, setUserInfo] =  useState({
        name: "",
        email: "",
        password: ""
      })


      const {data,mutateUser,isSuccess} =  useRegisterUser()

    const handleSetIsSignup = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        e.preventDefault()
        if(isOnSignupPage){
            isOnSignupPage.setIsSignupCallback(!isOnSignupPage.isUserSignup)
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

                mutateUser(userInfo)
            }

            return {isOnSignupPage, userInfo,handleSetIsSignup,handleInputEmail,handleInputName,handleInputPass, handleSubmit,data,isSuccess}
}

export default useForm