import React, {useState} from 'react';
import {Card, Spin, Popconfirm} from "antd";
import {LikeOutlined, LikeFilled, CommentOutlined, DeleteOutlined} from '@ant-design/icons';
import moment from "moment";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {useAddLikeMutation, useRemoveLikeMutation} from "../../app/services/like";
import {ErrorHandler} from "../../utils/ErrorHandler";
import {useRemovePostMutation} from "../../app/services/posts";

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
                  createdAt,
              }: Props) => {

    const auth = useSelector((state: any) => state.auth);

    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = useState('');

    //like functions
    const [addLike] = useAddLikeMutation()
    const [removeLike] = useRemoveLikeMutation()
    const isLikedCheck = likes?.find(like => like.userUUID == auth.user.uuid);
    const [isLiked, setIsLiked] = useState(isLikedCheck);
    const [likesLength, setLikesLength] = useState(likes?.length || 0);
    //post functions
    const [removePost] = useRemovePostMutation()
    const [isVisible, setIsVisible] = useState(true);

    const likeByUUID = async () => {
        try {
            setLoading(true)
            if (isLiked) {
                await removeLike(isLiked.uuid)
                setLikesLength(likesLength - 1)
                setIsLiked(undefined)
            } else {
                await addLike(uuid).unwrap().then((like) => {setIsLiked(like)})
                setLikesLength(likesLength + 1)
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

    const removePostByUUID = async () => {
        try {
            setLoading(true)
            await removePost(uuid)
            setIsVisible(false)
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

    return (
        <div className={'Post mt-10' + (!isVisible ? ' hidden' : ' block')}>
            <Spin spinning={loading}>
                <Card
                    title={<Link to={'/user/' + author.uuid}>{author.username}</Link>}
                    extra={<p>{moment(createdAt).format('DD.MM.YYYY - HH:mm')}</p>}
                    bordered={true}
                    type="inner"
                    actions={[
                        <div className='like' onClick={likeByUUID}>
                            {
                                isLiked ? (
                                    <LikeFilled className='mr-2'/>
                                ) : (
                                    <LikeOutlined key="edit" className='mr-2'/>
                                )
                            }
                            {likesLength}
                        </div>,
                        <div className='comments'>
                            <Link to={'/post/' + uuid}>
                                <CommentOutlined key="edit"/>
                            </Link>
                        </div>,
                        <div className={'remove' + (author.uuid == auth.user.uuid ? ' block' : ' hidden')}>
                            <Popconfirm
                                placement='topRight'
                                title="Delete the post"
                                description="Are you sure to delete this post?"
                                onConfirm={removePostByUUID}
                                okText="Yes"
                                cancelText="No"
                            >
                                <DeleteOutlined />
                            </Popconfirm>
                        </div>
                    ]}>
                    <h1>{text}</h1>
                </Card>
            </Spin>
        </div>
    );
};

export default Post;
