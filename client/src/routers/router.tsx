import { createBrowserRouter } from "react-router-dom";
import Formic from "../components/form";
import Home from "../pages/home";

type TSignup = {
    signup: boolean,
    setIsSignup: React.Dispatch<React.SetStateAction<boolean>>
}


    let router = createBrowserRouter([
        {
            path: "/",
            element: <Formic />
        },{
            path: "/greetings",
            element: <h1>I dey greet ooo</h1>
        }
    ])






export default router
