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
                                            author={comment.author}
                                            createdAt={comment.createdAt}
                                            text={comment.text}
                                            uuid={comment.uuid}
                                            key={comment.uuid} />
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
