import React, {useEffect} from "react";
import Post from "../../components/post";
import {useGetAllPostsQuery} from "../../app/services/posts";
import {Spin} from "antd";
import PostForm from "../../components/postForm";

export const Home = () => {
    const {data, isLoading, isFetching, refetch} = useGetAllPostsQuery();

    return (
        <div className='Home'>
            <Spin spinning={isLoading}>
                <PostForm title='Create new post' refetch={refetch}/>
                {
                    !isFetching && data ? (
                        <div className='posts'>
                            {
                                data.map((post, i) => {
                                    return <Post
                                        uuid={post.uuid}
                                        author={post.author || {
                                            uuid: null,
                                            username: null
                                        }}
                                        text={post.text}
                                        likes={post.postLikes}
                                        createdAt={post.createdAt}
                                        key={i}/>
                                })
                            }
                        </div>
                    ) : (
                        <div className='m-auto text-center'>No posts</div>
                    )
                }
            </Spin>
        </div>
    );
};
