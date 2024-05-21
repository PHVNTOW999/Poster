import React, {useEffect, useState} from "react";
import Post from "../../components/post";
import {useGetAllPostsQuery} from "../../app/services/posts";
import {Spin} from "antd";
import PostForm from "../../components/postForm";

export const Home = () => {

    const [skip, setSkip] = useState(0)
    const {data, isLoading, isFetching, refetch} = useGetAllPostsQuery(skip);
    const [posts, setPosts] = useState<any[]>([])

    const GetPosts = async (data: any, posts: any, skip: number) => {
        try {
            await isLoading
            await data

            if(!posts.length && data.length) {
                setPosts([...posts, ...data])
            }
            else if(data[0].uuid !== posts[0].uuid) {
                setPosts([...posts, ...data])
            }
        } catch (e) {
            console.log(e)
        } finally {
            await isFetching
        }
    }


    useEffect(() => {
        GetPosts(data, posts, skip).then(r => null)

        document.addEventListener('scroll', (event: Event) => {
            if (data?.length) scrollHandler(event, data, posts, skip)
        })

        return function () {
            document.removeEventListener('scroll', (event: Event) => {
                if (data?.length) scrollHandler(event, data, posts, skip)
            })
        }

    }, [isFetching])

    const scrollHandler = (e: any, data: any, posts: any, skip: number) => {
        const scrollHeight = e.target.documentElement.scrollHeight
        const scrollTop = e.target.documentElement.scrollTop
        const winHeight = window.innerHeight

        if (scrollHeight - (scrollTop + winHeight) < 1) {
            setSkip(skip + 10)
            GetPosts(data, posts, skip).then(r => null)
        }
    }

    return (
        <div className='Home'>
            <Spin spinning={isLoading || isFetching}>
                <PostForm title='Create new post' refetch={refetch}/>
                {
                    posts.length ? (
                        <div className='posts'>
                            {
                                posts.map((post, i) => {
                                    return <Post uuid={post.uuid}
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
