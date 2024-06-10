import React from 'react';
import {Card} from "antd";
import Comment from "../comment";

type Props = {
    data: any;
}

const CommentList = ({data}: Props) => {
    return (
        <div className='commentList'>
            <Card title="Comments">
                {
                    data.length ? (
                            <div>
                                {
                                    data.map((comment: any) => {
                                        return <Comment
                                            uuid={comment.uuid}
                                            author={comment.author}
                                            text={comment.text}
                                            createdAt={comment.createdAt}
                                            key={comment.uuid}/>
                                    })
                                }
                            </div>
                        )
                        : (
                            <div className='m-auto text-center'>No comments</div>
                        )
                }
            </Card>
        </div>
    );
};

export default CommentList;
