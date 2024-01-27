
import { useMutation} from "react-query"
import { useState } from "react"
import { registerUser } from "../../../services/auth/login"


const useRegisterUser = ()=>{
    const [registerResponse,setRegisterResponse] = useState<any>()
    let [registerError , setregisterError] =  useState<{message: string}>()
    const {isError,isLoading,isSuccess,mutate} = useMutation("#register",registerUser, {
        onSuccess: ()=>{
            console.log(" registered successfully")
        },
        onError: ()=>{
            console.log("an error occured while registering user")
        }
    })

    const mutateUser = (userPayload: {name: string,email: string, password: string})=>{
 mutate(userPayload,{
    onError(error) {
        setregisterError(error as  {message: string})
    },
    onSuccess(data){
        setRegisterResponse(data)
    }
})
    }
    return {isError,isLoading,isSuccess, mutateUser,registerResponse,registerError}
}

export default useRegisterUser



