import {
    createBrowserRouter,
} from "react-router-dom";
import Whiteboard from "./Components/Whiteboard";
import Index from "./Components/Index";

const allRoutes = [
    {
        path: "/",
        element: <Index />,
    },
    {
        path: "/room",
        element: <Whiteboard />,
    },
]

const routes = createBrowserRouter(allRoutes);

export default routes