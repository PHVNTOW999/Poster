import React from 'react';
import {Header} from "../../components/header";
import {Outlet} from "react-router-dom";

export const Root = () => {
    return (
        <div className='layout'>
            <Header/>
            <div className="main">
                <Outlet/>
            </div>
        </div>
    );
};
