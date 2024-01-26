import { createBrowserRouter } from "react-router-dom";
import App from "../App/App";
import Formic from "../components/Form";


    let router = createBrowserRouter([
        {
            path: "/",
            element: <App />,
            children: [
                {
                    path: "/register",
                    element: <Formic />
                },{
                    path: "/me",
                    element: <div>THis is me</div>
                 }
            ]
        }
        
    ])






export default router
