// @ts-ignore
import {Like} from "@prisma/client";
import {api} from "./api"

export const postsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        addLike: builder.mutation<string, string>({
            query: (uuid) => ({
                url: `/like/${uuid}`,
                method: 'POST'
            })
        }),
        removeLike: builder.mutation<string, string>({
            query: (uuid) => ({
                url: `/like/remove/${uuid}`,
                method: 'POST'
            })
        })
    })
})

export const {
    useAddLikeMutation,
    useRemoveLikeMutation
} = postsApi;

export const {
    endpoints: {
        addLike,
        removeLike
    }
} = postsApi;