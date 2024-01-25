import { createContext } from "react";


type TUserSignup = {
    setIsSignupCallback: React.Dispatch<React.SetStateAction<boolean>>,
    isUserSignup: boolean
}

let isSignupContext =  createContext<null |  TUserSignup>(null)


export default isSignupContext