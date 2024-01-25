import { ReactNode } from "react"

type THomeProps = {
    children: ReactNode
}
const Home = ({children}: THomeProps)=>{
    return (
<div>{children}</div>
    )
}

export default Home