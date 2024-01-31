
type TUser = {
  user: {
    password: string,
    email: string,
   _id: string,
   name: string
  },
 mutateUser:(userId: string) => void
}
const ListUser = ({user, mutateUser}: TUser)=>{
    return (
        <div className="user_container" onClick={()=> {mutateUser(user._id)}}>
        <button className="w-[100px] p-4 bg-green-200 rounded-lg mx-2">{user.name}</button>
       </div>
    )
}

export default ListUser