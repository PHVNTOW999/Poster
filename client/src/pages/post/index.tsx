import React from 'react';
import {useParams} from "react-router-dom";

const Post = () => {
    const params = useParams<{ uuid: string }>();
    return (
        <div className='postPage'>
            <h1>{params.uuid}</h1>
        </div>
    );
};

export default Post;
