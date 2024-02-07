import { createContext } from "react";


type TUserInfo = {
    setUserInfo: React.Dispatch<React.SetStateAction<{
        name: string;
        email: string;
        _id: string;
    }>>,
    userInfo: {name: string, email: string, _id: string}
}

let userInfoContext =  createContext<null |  TUserInfo>(null)


export default userInfoContext