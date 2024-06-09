import React, {useEffect, useState} from 'react';
import {Spin} from "antd";
import Post from "../post";
import {addError} from "../../features/errors/errorSlicer";
import {useDispatch} from "react-redux";

type Props = {
    isLoading: any;
    isFetching: any;
    data: any;
    skip: number;
    returnSkip: any;
}

const PostList = ({isLoading, isFetching, data, skip, returnSkip}: Props) => {
    const dispatch = useDispatch();
    const [posts, setPosts] = useState<any[]>([])

    const GetPosts = async (data: any, posts: any) => {
        try {
            await isLoading
            await data
            await isFetching
            let checkedData: { uuid: any; }[] = []

            data.forEach((obj: { uuid: any }) => {
                const checkPost = posts.find((post: { uuid: string }) => {
                    if (obj.uuid === post.uuid) return obj
                })
                if (!checkPost) {
                    checkedData.push(obj)
                }
            })

            if (checkedData.length === 1) setPosts([...checkedData, ...posts])
            else setPosts([...posts, ...checkedData])
        } catch (error) {
            dispatch(addError(error));
        }
    }

    useEffect(() => {
        if (!isLoading && !isFetching) GetPosts(data, posts).then()

        document.addEventListener('scroll', (event: Event) => {
            if (data?.length) scrollHandler(event, data, posts, skip).then()
        })

        return function () {
            document.removeEventListener('scroll', (event: Event) => {
                if (data?.length) scrollHandler(event, data, posts, skip).then()
            })
        }


    }, [data])

    const scrollHandler = async (e: any, data: any, posts: any, skip: number) => {
        const scrollHeight = e.target.documentElement.scrollHeight
        const scrollTop = e.target.documentElement.scrollTop
        const winHeight = window.innerHeight

        if (scrollHeight - (scrollTop + winHeight) < 1) {
            await returnSkip(skip + 10)
            GetPosts(data, posts).then()
        }
    }

    return (
        <div className='postList'>
            <Spin spinning={isLoading || isFetching}>
                {
                    posts.length ? (
                        <div className='posts mb-10'>
                            {
                                posts.map((post: any) => {
                                    return <Post uuid={post.uuid}
                                                 author={post.author || {
                                                     uuid: null,
                                                     username: null
                                                 }}
                                                 text={post.text}
                                                 likes={post.postLikes}
                                                 createdAt={post.createdAt}
                                                 key={post.uuid}/>
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

export default PostList;
