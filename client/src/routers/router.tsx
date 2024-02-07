import { createBrowserRouter } from "react-router-dom";
import App from "../App/App";
import Formic from "../components/Form";
import ROUTES from "../constants/routes";
import Home from "../pages";



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
                    element: <Home />
                 }
            ]
        }
        
    ])






export default router
