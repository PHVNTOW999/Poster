import React from 'react';
import {Card} from "antd";
import {LikeOutlined, CommentOutlined} from '@ant-design/icons';
import moment from "moment";

type Props = {
    author: {
        uuid: string
        username: string
    };
    text: string;
    likes?: Array<object>;
    comments?: Array<object>;
    createdAt: string;
}

const Post = ({
                  author,
                  text,
                  likes,
                  comments,
                  createdAt,
              }: Props) => {
    return (
        <div className='Post mb-10'>
            <Card
                title={<a href={'user/' + author.uuid}>{author.username}</a>}
                extra={<p>{moment(createdAt).format('DD.MM.YYYY - HH:mm')}</p>}
                bordered={true}
                type="inner"
                actions={[
                    <LikeOutlined key="edit"/>,
                    <CommentOutlined key="edit"/>,
                ]}>
                <h1>{text}</h1>
            </Card>
        </div>
    );
};

export default Post;
