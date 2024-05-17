// @ts-ignore
import {User} from "@prisma/client";
import {api} from "./api"

// export type UserData = Omit<User, "uuid">;
export type UserData = User
type ResponseLoginData = User & { token: string };
export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<ResponseLoginData, UserData>({
            query: (userData) => ({
                url: "user/login",
                method: "POST",
                body: userData,
            })
        }),
        register: builder.mutation<ResponseLoginData, UserData>({
            query: (userData) => ({
                url: "user/register",
                method: "POST",
                body: userData,
            })
        }),
        user: builder.query<User, string>({
            query: (uuid) => ({
                url: `user/byid/${uuid}`,
                method: "GET",
            })
        }),
        current: builder.query<ResponseLoginData, void>({
            query: () => ({
                url: "user/current",
                method: "GET",
            })
        }),
    })
})

export const {useLoginMutation, useRegisterMutation, useUserQuery, useCurrentQuery} = authApi;
export const {endpoints: {login, register, user, current}} = authApi;