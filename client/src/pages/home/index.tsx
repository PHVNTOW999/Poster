import React from "react";
import Post from "../../components/post";
import {useGetAllPostsQuery} from "../../app/services/posts";
import {Spin} from "antd";

export const Home = () => {
    const {data, isLoading, isFetching} = useGetAllPostsQuery()


    return (
        <div className='Home'>
            <Spin spinning={isLoading}>
                {
                    !isFetching && data ? (
                        <div className='posts'>
                            {
                                data.map((post, i) => {
                                    return <Post
                                        author={post.author}
                                        text={post.text}
                                        likes={post.postLikes}
                                        comments={post.postComments}
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
