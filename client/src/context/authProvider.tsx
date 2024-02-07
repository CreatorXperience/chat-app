import { createContext } from "react";


type TUserPayload = {
    name: string,
    _id: string,
    email: string
}
let authContext =  createContext<null |  TUserPayload>(null)


export default authContext