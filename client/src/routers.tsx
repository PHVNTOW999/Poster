import {createBrowserRouter} from "react-router-dom";
import {Home} from "./pages/home";
import {Login} from "./pages/auth/login";
import {Root} from "./pages/root";

export const paths = [
    {
        name: 'Home',
        path: '/home',
    },
]

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        children: [
            {
                path: "/",
                element: <Home/>,
            },
            {
                path: "/home",
                element: <Home/>,
            },
            {
                path: "/login",
                element: <Login/>,
            },
        ],
    },
]);