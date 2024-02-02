
import { useMutation} from "react-query"
import { useState } from "react"
import { loginUser } from "../../../services/auth/login"


const useLoginUser = ()=>{
    const [loginResponse,setLoginResponse] = useState<any>()
    let [errorResponse, setErrorResponse] =  useState<{message: string}>()
    const {isError,isLoading,isSuccess,mutate} = useMutation("#registeruser", loginUser)

    const mutateUserLogin = (userPayload: {email: string, password: string})=>{
    mutate(userPayload, {
        onError(error, variables, context) {
            setErrorResponse(error as  {message: string})
        },
        onSuccess(data){
            setLoginResponse(data)
        }
    })
    }
    return {isError,isLoading,isSuccess, mutateUserLogin, loginResponse,errorResponse}
}

export default useLoginUser



