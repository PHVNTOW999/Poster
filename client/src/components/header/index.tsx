import React from 'react';
import {Link} from "react-router-dom";
import {paths} from "../../routers";
import {Button} from "antd";
import {useSelector} from "react-redux";

export const Header = () => {
    const auth = useSelector((state: any) => state.auth);
    return (
        <header className='header w-full p-4 flow-root'>
            <nav className='nav float-left w-20 flex justify-between'>
                {
                    paths.map((link, i) => {
                        return (
                            <div className='link' key={i}>
                                <Link to={link.path}>{link.name}</Link>
                            </div>
                        )
                    })
                }
            </nav>
            <div className="auth float-right">
                {
                    auth.isAuthenticated ? (
                        <div className='User'>
                            {auth.user.username}
                            <Button type='primary' size='small'>
                                Exit
                            </Button>
                        </div>
                    ) : (
                        <div className='Auth'>
                            <Link to='/login'>
                                <Button type='primary' size='small'>
                                    Log in
                                </Button>
                            </Link>
                            <Link to='/register' className='ml-2'>
                                <Button type='primary' size='small'>
                                    Register
                                </Button>
                            </Link>
                        </div>
                    )
                }
            </div>
        </header>
    );
};
