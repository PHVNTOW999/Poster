import {createBrowserRouter} from "react-router-dom";
import {Home} from "./pages/home";
import {Login} from "./pages/auth/login";
import {Root} from "./pages/root";
import Register from "./pages/auth/register";
import User from "./pages/user";

export const paths = [
    {
        name: 'Home',
        path: '/home',
    },
    {
        name: 'Popular',
        path: '/popular',
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
                path: "/user/:uuid",
                element: <User/>,
            },
            {
                path: "/login",
                element: <Login/>,
            },
            {
                path: "/register",
                element: <Register/>,
            },
        ],
    },
]);