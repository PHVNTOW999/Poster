import React from 'react';
import {useParams} from "react-router-dom";
import {useGetAllPostsQuery, useGetPostQuery} from "../../app/services/posts";

const Post = () => {
    let { uuid } = useParams();
    uuid = uuid as string

    const {data, isLoading, isFetching, refetch} = useGetPostQuery(uuid);

    return (
        <div className='postPage'>
            {
                !isLoading && !isFetching && data ? (
                    <div className='post'>
                        {data.text}
                    </div>
                    )
                    : (
                        <div className='post'>

                        </div>
                    )
            }
            {/*<h1>{data.text}</h1>*/}
        </div>
    );
};

export default Post;
