import React, {useState} from 'react';
import {Card, Spin} from "antd";
import {LikeOutlined, LikeFilled, CommentOutlined} from '@ant-design/icons';
import moment from "moment";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {useAddLikeMutation, useRemoveLikeMutation} from "../../app/services/like";
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
    refetch?: any;
}

const Post = ({
                  uuid,
                  author,
                  text,
                  likes,
                  comments,
                  createdAt,
                  refetch,
              }: Props) => {

    const auth = useSelector((state: any) => state.auth);
    const [addLike] = useAddLikeMutation()
    const [removeLike] = useRemoveLikeMutation()
    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = useState('');

    const isLiked = likes?.find(like => like.userUUID == auth.user.uuid);
    const like = async () => {
        try {
            setLoading(true)
            if (isLiked) {
                await removeLike(isLiked.uuid)
            } else {
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
            await refetch()
            setLoading(false)
        }
    }

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
