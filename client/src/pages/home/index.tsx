import React, {useEffect, useState} from "react";
import Post from "../../components/post";
import {useGetAllPostsQuery} from "../../app/services/posts";
import {Spin} from "antd";
import PostForm from "../../components/postForm";

export const Home = () => {

    const [skip, setSkip] = useState(0)
    const {data, isLoading, isFetching, refetch} = useGetAllPostsQuery(skip);
    const [posts, setPosts] = useState<any[]>([])

    const GetPosts = async (data: any, posts: any) => {
        try {
            await isLoading
            await data
            await isFetching

            if (data.length && !posts.length) setPosts([...posts, ...data])
            else {
                let checkedData: { uuid: any; }[] = []

                data.forEach((obj: { uuid: any }) => {
                    const checkPost = posts.find((post: { uuid: any }) => {
                        if (obj.uuid === post.uuid) return obj
                    })

                    if (!checkPost) checkedData.push(obj)
                })

                setPosts([...checkedData, ...posts])
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (!isLoading && !isFetching) GetPosts(data, posts).then(r => null)

        document.addEventListener('scroll', (event: Event) => {
            if (data?.length) scrollHandler(event, data, posts, skip)
        })

        return function () {
            document.removeEventListener('scroll', (event: Event) => {
                if (data?.length) scrollHandler(event, data, posts, skip)
            })
        }

    }, [data])

    const scrollHandler = (e: any, data: any, posts: any, skip: number) => {
        const scrollHeight = e.target.documentElement.scrollHeight
        const scrollTop = e.target.documentElement.scrollTop
        const winHeight = window.innerHeight

        if (scrollHeight - (scrollTop + winHeight) < 1) {
            setSkip(skip + 10)
            GetPosts(data, posts).then(r => null)
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
