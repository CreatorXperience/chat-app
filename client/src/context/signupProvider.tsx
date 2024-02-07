import { createContext } from "react";


type TUserSignup = {
    setIsOnSignupPageCallback: React.Dispatch<React.SetStateAction<boolean>>,
    isUserOnSignUpPage: boolean
}

let isUserOnSignUpPageContext =  createContext<null |  TUserSignup>(null)


export default isUserOnSignUpPageContext