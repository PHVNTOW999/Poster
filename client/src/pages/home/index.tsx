import React, {useEffect} from "react";
import Post from "../../components/post";
import {useGetAllPostsQuery} from "../../app/services/posts";
import {Spin} from "antd";
import CustomForm from "../../components/form";

export const Home = () => {
    const {data, isLoading, isFetching} = useGetAllPostsQuery();

    return (
        <div className='Home'>
            <Spin spinning={isLoading}>
                <CustomForm title='Create new post' />
                {
                    !isFetching && data ? (
                        <div className='posts'>
                            {
                                data.map((post, i) => {
                                    return <Post
                                        uuid={post.uuid}
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
