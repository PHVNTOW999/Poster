import React from 'react';
import {Header} from "../../components/header";
import {Outlet} from "react-router-dom";

export const Root = () => {
    return (
        <div className='layout'>
            <Header/>
            <div className="main">
                <h1>
                    Hello world!
                </h1>
                <Outlet/>
            </div>
        </div>
    );
};
