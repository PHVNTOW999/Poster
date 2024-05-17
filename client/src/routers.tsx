import {createBrowserRouter} from "react-router-dom";
import {Home} from "./pages/home";
import {Login} from "./pages/auth/login";
import {Root} from "./pages/root";
import Register from "./pages/auth/register";
import User from "./pages/user";
import Post from "./pages/post";

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
                path: "/post/:uuid",
                element: <Post/>,
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