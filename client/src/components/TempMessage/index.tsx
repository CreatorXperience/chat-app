import useGetUser from "../../App/hooks/useGetUser"

type TMessageProps = {
data: {
   message: string, 
   from: string
}
}
const TempMessage = ({data}: TMessageProps)=> {
    const {user} = useGetUser()
    return (
        <div className={`w-[100%] flex ${data.from !== user?._id ? "justify-start":"justify-end"} py-4 px-4`}>
        <div className="w-fit  bg-blue-400  flex justify-center items-center px-4 h-[40px] rounded-md">
{data.message}
        </div>
        </div>
    )
}

export default TempMessage