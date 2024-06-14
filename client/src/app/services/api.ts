import {createApi, fetchBaseQuery, retry} from "@reduxjs/toolkit/query/react";
import {RootState} from "../store";

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://185.23.236.104:5050/api',
    prepareHeaders: (headers, {getState}) => {
        const token = (getState() as RootState).auth.user?.token ||
            localStorage.getItem('token');

        if(token !== null && token) {
            headers.set('authorization', `Bearer ${token}`)
        }
    }
});

const baseQueryWithRetry = retry(baseQuery, {maxRetries: 1});

export const api = createApi({
    reducerPath: 'splitApi',
    baseQuery: baseQueryWithRetry,
    refetchOnMountOrArgChange: true,
    endpoints: () => ({})
})