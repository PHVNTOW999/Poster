// @ts-ignore
import {Post} from "@prisma/client";
import {api} from "./api"
export const postsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        addPost: builder.mutation<Post, Post>({
            query: (data) => ({
                url: `/post/create`,
                method: 'POST',
                body: data
            })
        }),
        getAllPosts: builder.query<Post[], number>({
            query: (skip) => ({
                url: `post/all?skip=${skip}`,
                method: 'GET'
            })
        }),
        getAllPopularPosts: builder.query<Post[], number>({
            query: (skip) => ({
                url: `post/popular?skip=${skip}`,
                method: 'GET'
            })
        }),
        getPost: builder.query<Post, string>({
            query: (uuid) => ({
                url: `/post/${uuid}`,
                method: 'GET'
            })
        }),
        removePost: builder.mutation<string, string>({
            query: (uuid) => ({
                url: `/post/remove/${uuid}`,
                method: 'POST'
            })
        })
    })
})

export const {
    useAddPostMutation,
    useGetAllPostsQuery,
    useGetAllPopularPostsQuery,
    useGetPostQuery,
    useRemovePostMutation
} = postsApi;

export const {
    endpoints: {
        addPost,
        getAllPosts,
        getAllPopularPosts,
        getPost,
        removePost
    }
} = postsApi;