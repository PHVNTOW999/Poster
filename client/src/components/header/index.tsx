import React from 'react';
import {Link} from "react-router-dom";
import {paths} from "../../routers";
import {Button} from "antd";

export const Header = () => {
    return (
        <header className='header w-full p-4 flow-root'>
            <nav className='nav float-left w-20 flex justify-between'>
                {
                    paths.map(link => {
                        return (
                            <div className='link'>
                                <Link to={link.path}>{link.name}</Link>
                            </div>
                        )
                    })
                }
            </nav>
            <div className="auth float-right">
                <Button type='primary' size='small'>Login</Button>
                <Button type='primary' size='small' className="ml-2">Register</Button>
            </div>
        </header>
    );
};
