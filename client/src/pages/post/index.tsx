import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import {useAddPostMutation, useGetPostQuery} from "../../app/services/posts";
import {Space, Spin} from "antd";
import Post from "../../components/post";
import CustomForm from "../../components/form";
import {useAddCommentMutation} from "../../app/services/comment";
import {addError} from "../../features/errors/errorSlicer";
import {useDispatch} from "react-redux";
import CommentList from "../../components/commentList";

const PostPage = () => {
    const dispatch = useDispatch();

    let {uuid} = useParams();
    uuid = uuid as string

    const {data, isLoading, isFetching, refetch} = useGetPostQuery(uuid);
    const [addComment] = useAddCommentMutation()

    const createComment = async (data: any) => {
        try {
            const payload = {
                'data': data,
                'uuid': uuid
            }

            await addComment(payload)
            await refetch()
        } catch (err) {
            dispatch(addError(err));
        }
    }

    return (
        <div className='postPage'>
            <Spin spinning={isLoading || isFetching}>
                {
                    !isLoading && !isFetching && data ? (
                            <div className='post'>
                                <Post
                                    author={data.author}
                                    createdAt={data.createdAt}
                                    text={data.text}
                                    uuid={data.uuid}
                                    likes={data.postLikes}/>
                                <div className='mt-5 mb-5'>
                                    <CustomForm
                                        title='Send a new comment'
                                        submit={createComment}/>
                                </div>
                                <div className='mb-5'>
                                    <CommentList data={data.postComments}/>
                                </div>
                            </div>
                        )
                        : null
                }
            </Spin>
        </div>
    );
};

export default PostPage;
