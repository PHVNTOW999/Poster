import React, {useEffect, useState} from 'react';
import {Card, Spin} from "antd";
import {LikeOutlined, LikeFilled, CommentOutlined} from '@ant-design/icons';
import moment from "moment";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {removeLike, useAddLikeMutation, useRemoveLikeMutation} from "../../app/services/like";
import {ErrorHandler} from "../../utils/ErrorHandler";

type Props = {
    uuid: string;
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
                  uuid,
                  author,
                  text,
                  likes,
                  comments,
                  createdAt,
              }: Props) => {

    const auth = useSelector((state: any) => state.auth);
    const [isLiked, setIsLiked] = useState(false);
    const [addLike] = useAddLikeMutation()
    const [removeLike] = useRemoveLikeMutation()
    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = useState('');

    const like = async () => {
        try {
            setLoading(true)
            if (isLiked) {
                await removeLike(uuid)
            } else {
                console.log('ggs')
                await addLike(uuid)
            }
        } catch (error) {
            const maybeError = ErrorHandler(error);

            if (maybeError) {
                setError(error.data.message);
            } else {
                setError("Unknown error");
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        likes?.map((post) => {
            if (post.userUUID == auth.user.uuid) {
                return setIsLiked(true)
            } else
                return setIsLiked(false)
        })
    }, [])
    return (
        <div className='Post mb-10'>
            <Spin spinning={loading}>
                <Card
                    title={<Link to={'/user/' + author.uuid}>{author.username}</Link>}
                    extra={<p>{moment(createdAt).format('DD.MM.YYYY - HH:mm')}</p>}
                    bordered={true}
                    type="inner"
                    actions={[
                        <div className='like' onClick={like}>
                            {
                                isLiked ? (
                                    <LikeFilled className='mr-2'/>
                                ) : (
                                    <LikeOutlined key="edit" className='mr-2'/>
                                )
                            }
                            {likes?.length}
                        </div>,
                        <div>
                            <CommentOutlined key="edit"/>
                        </div>
                    ]}>
                    <h1>{text}</h1>
                </Card>
            </Spin>
        </div>
    );
};

export default Post;
