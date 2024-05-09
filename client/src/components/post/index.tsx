import React from 'react';
import {Card} from "antd";
import {LikeOutlined, LikeFilled, CommentOutlined} from '@ant-design/icons';
import moment from "moment";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

type Props = {
    author: {
        uuid: string
        username: string
    };
    text: string;
    likes?: Array<any>;
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

    const auth = useSelector((state: any) => state.auth);
    const isLiked = () => {
        likes?.map((post, i) => {
            if (post.userUUID == auth.user.uuid) {
                return true
            } else
                return false
        })
    }
    return (
        <div className='Post mb-10'>
            <Card
                title={<Link to={'/user/' + author.uuid}>{author.username}</Link>}
                extra={<p>{moment(createdAt).format('DD.MM.YYYY - HH:mm')}</p>}
                bordered={true}
                type="inner"
                actions={[
                    <div className='like'>
                        <LikeOutlined key="edit" className='mr-2'/>
                        {/*<LikeFilled/>*/}
                        {likes?.length}
                    </div>,
                    <div>
                        <CommentOutlined key="edit"/>
                    </div>
                ]}>
                <h1>{text}</h1>
            </Card>
        </div>
    );
};

export default Post;
