import {createBrowserRouter} from "react-router-dom";
import {Home} from "./pages/home";
import {Login} from "./pages/auth/login";

export const paths = {
    // main
    home: '/',
    popular: '/popular',
    post: '/post/:uuid',
    // user
    user: '/user/:uuid',
    // auth
    register: '/register',
    login: '/login',
} as const;

export const routers = createBrowserRouter([
    {
        path: '/',
        element: Home(),
        index: true,
    },
    {
        path: '/login',
        element: Login(),
    },
]);