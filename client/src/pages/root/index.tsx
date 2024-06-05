import React from 'react';
import {Header} from "../../components/header";
import {Outlet} from "react-router-dom";
import {ErrorHandler} from "../../utils/errorHandler";

export const Root = () => {
    return (
        <div className='layout'>
            <Header/>
            <div className="main w-2/3 m-auto mt-10">
                <ErrorHandler />
                <Outlet/>
            </div>
        </div>
    );
};
