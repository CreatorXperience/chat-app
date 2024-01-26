import { useContext } from "react"
import isUserOnSignUpPageContext from "../../../context/signupProvider"
import { useNavigate } from "react-router-dom"

const useNavUtils = ()=>{
    const isOnSignupPage =  useContext(isUserOnSignUpPageContext)
    const navigate =  useNavigate()

    const handleLogOut = ()=>{
        localStorage.removeItem("userinfo")
        navigate("/register")
        window.location.reload()
      }
      
      const handleGetToLoginPage = ()=> {
      isOnSignupPage?.setIsOnSignupPageCallback(!isOnSignupPage.isUserOnSignUpPage)
      }

return {handleLogOut,handleGetToLoginPage}

}

export default useNavUtils