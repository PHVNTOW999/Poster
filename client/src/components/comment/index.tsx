import React, {useState} from 'react';
import {Card, Popconfirm, Spin} from "antd";
import {DeleteOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import moment from "moment/moment";
import {useDispatch, useSelector} from "react-redux";
import {addError} from "../../features/errors/errorSlicer";
import {useRemoveCommentMutation} from "../../app/services/comment";

type Props = {
    uuid: string;
    author: {
        uuid: string
        username: string
    };
    text: string;
    createdAt: string;
}

const Comment = ({
                     uuid,
                     author,
                     text,
                     createdAt,
                 }: Props) => {
    const auth = useSelector((state: any) => state.auth);
    const dispatch = useDispatch();

    const [loading, setLoading] = React.useState<boolean>(false);
    const [isVisible, setIsVisible] = useState(true);

    const [removeComment] = useRemoveCommentMutation()

    const removeCommentByUUID = async () => {
        try {
            setLoading(true)
            await removeComment(uuid)
            setIsVisible(false)
        } catch (error) {
            dispatch(addError(error));
            setIsVisible(true)
        } finally {
            setLoading(false)
        }
    }

    const removeCommComp = () => {
        if (author.uuid == auth.user.uuid) {
            return <div className='remove'>
                <Popconfirm
                    placement='top'
                    title="Delete the comment"
                    description="Are you sure to delete this comment?"
                    onConfirm={removeCommentByUUID}
                    okText="Yes"
                    cancelText="No"
                >
                    <DeleteOutlined/>
                </Popconfirm>
            </div>
        } else return null
    }

    return (
        <div className={'comment mt-5 ' + (isVisible ? 'block' : 'hidden')}>
            <Spin spinning={loading}>
                {
                    author.uuid !== auth.user.uuid ? (
                        <Card
                            title={<Link to={'/user/' + author.uuid}>{author.username}</Link>}
                            extra={<p>{moment(createdAt).format('DD.MM.YYYY - HH:mm')}</p>}
                            bordered={true}
                            type="inner"
                        >
                            <h1>{text}</h1>
                        </Card>
                    ) : (
                        <Card
                            title={<Link to={'/user/' + author.uuid}>{author.username}</Link>}
                            extra={<p>{moment(createdAt).format('DD.MM.YYYY - HH:mm')}</p>}
                            bordered={true}
                            type="inner"
                            actions={[removeCommComp()]}
                        >
                            <h1>{text}</h1>
                        </Card>
                    )
                }
            </Spin>
        </div>
    );
};

export default Comment;
