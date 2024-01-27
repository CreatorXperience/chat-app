import { createBrowserRouter } from "react-router-dom";
import App from "../App/App";
import Formic from "../components/Form";
import ROUTES from "../constants/routes";


    let router = createBrowserRouter([
        {
            path: ROUTES.home,
            element: <App />,
            children: [
                {
                    path: ROUTES.register,
                    element: <Formic />
                },{
                    path: ROUTES.me,
                    element: <div>THis is me</div>
                 }
            ]
        }
        
    ])






export default router
