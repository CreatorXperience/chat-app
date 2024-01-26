import { createBrowserRouter } from "react-router-dom";
import Formic from "../components/Form";


    let router = createBrowserRouter([
        {
            path: "/",
            element: <Formic />
        },
        {
            path: "/greetings",
            element: <h1>I dey greet ooo</h1>
        },
    ])






export default router
