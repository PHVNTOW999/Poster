import React from 'react';
import {Link} from "react-router-dom";

const NotAuth = () => {
    return (
        <div className='notAuth'>
            Please
            <Link to='/register'>Register</Link> or
            <Link to='/login'>Login</Link>
            for posting new Posts, Comments and likes!
        </div>
    );
};

export default NotAuth;
