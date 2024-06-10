import {api} from "./api"

export const postsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        addComment: builder.mutation<object, any>({
            query: (data) => ({
                url: `/comment/create/${data.uuid}`,
                method: 'POST',
                body: data.data
            })
        }),
        removeComment: builder.mutation<string, string>({
            query: (uuid) => ({
                url: `/comment/remove/${uuid}`,
                method: 'POST'
            })
        })
    })
})

export const {
    useAddCommentMutation,
    useRemoveCommentMutation
} = postsApi;

export const {
    endpoints: {
        addComment,
        removeComment
    }
} = postsApi;