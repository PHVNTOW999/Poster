import React, {useState} from 'react';
import CustomForm from "../../components/form";
import PostList from "../../components/postList";
import {useDispatch} from "react-redux";
import {useAddPostMutation, useGetAllPopularPostsQuery} from "../../app/services/posts";
import {addError} from "../../features/errors/errorSlicer";

const Popular = () => {
    const dispatch = useDispatch();
    const [skip, setSkip] = useState(0)
    const {data, isLoading, isFetching, refetch} = useGetAllPopularPostsQuery(skip);
    const [addPost] = useAddPostMutation()

    const createPost = async (data: any) => {
        try {
            await addPost(data)
            await setSkip(0)
            await refetch()
        } catch (err) {
            dispatch(addError(err));
        }
    }

    return (
        <div className='popular'>
            <CustomForm title='Create new post' submitName='Create' submit={createPost}/>
            <PostList isLoading={isLoading}
                      isFetching={isFetching}
                      data={data}
                      skip={skip}
                      returnSkip={setSkip}
                      pagination={true}/>
        </div>
    );
};

export default Popular;
