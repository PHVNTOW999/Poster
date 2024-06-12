import React, {useState} from "react";
import {useAddPostMutation, useGetAllPostsQuery} from "../../app/services/posts";
import CustomForm from "../../components/form";
import {addError} from "../../features/errors/errorSlicer";
import {useDispatch} from "react-redux";
import PostList from "../../components/postList";

export const Home = () => {
    const dispatch = useDispatch();
    const [skip, setSkip] = useState(0)
    const {data, isLoading, isFetching, refetch} = useGetAllPostsQuery(skip);
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
        <div className='Home'>
            <CustomForm title='Create new post'
                        submitName='Create'
                        submit={createPost}/>
            <PostList isLoading={isLoading}
                      isFetching={isFetching}
                      data={data}
                      skip={skip}
                      returnSkip={setSkip}
                      pagination={true}/>
        </div>
    );
};
