import React from 'react';
import {router} from "./routers";
import {RouterProvider} from "react-router-dom";

export const App = () => {
    return (
        <div className='App'>
            <RouterProvider router={router}/>
        </div>
    );
};