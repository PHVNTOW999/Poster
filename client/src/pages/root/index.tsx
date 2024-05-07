import React from 'react';
import {Header} from "../../components/header";
import {Outlet} from "react-router-dom";

export const Root = () => {
    return (
        <div className='layout'>
            <Header/>
            <div className="main w-2/3 m-auto mt-10">
                <Outlet/>
            </div>
        </div>
    );
};
