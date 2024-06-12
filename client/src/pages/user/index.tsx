import React, {useEffect, useState} from 'react';
import {useParams, useSearchParams, useLocation} from "react-router-dom";
import {useUserQuery} from "../../app/services/auth";
import {Skeleton, Spin, Tabs, Typography} from "antd";
import {SnippetsFilled, CommentOutlined, LikeOutlined} from '@ant-design/icons';
import moment from "moment/moment";
import PostList from "../../components/postList";

const User = () => {
    const location = useLocation()
    const params = useParams<{ uuid: string }>();
    const {data, isLoading, isFetching, refetch} = useUserQuery(params.uuid || '')
    const [skip, setSkip] = useState(0)
    const [activeKey, setActiveKey] = useSearchParams('?key=posts');

    useEffect(() => {
        const key = activeKey.get('key')

        switch (key) {
            case 'comments':
                setActiveKey('?key=comments')
                break;
            case 'likes':
                setActiveKey('?key=likes')
                break;
            default:
                setActiveKey('?key=posts')
        }
    }, [activeKey]);

    const childTitle = (title: string, key: string) => {
        return <div className='contents'
                   onClick={() => setActiveKey(`?key=${key}`)}>
            {title}
        </div>
    }

    const postsChild = () => {
        return <div className='postsChild'>
            <PostList isLoading={isLoading}
                      isFetching={isFetching}
                      data={data.userPosts}
                      skip={skip}
                      returnSkip={setSkip}
                      refetch={refetch}
                      pagination={false}/>
        </div>
    }


    const child = (newData: any) => {
        return <div className='commentsChild'>
            <PostList isLoading={isLoading}
                      isFetching={isFetching}
                      data={newData}
                      skip={skip}
                      returnSkip={setSkip}
                      refetch={refetch}
                      pagination={false}/>
        </div>
    }

    const {Title, Text} = Typography;

    return (
        <div className='user'>
            <Spin spinning={isLoading || isFetching}>
                {
                    data ? (
                        <div>
                            <div className="userData flex justify-between">
                                <Title level={5} className='username'>
                                    {data.username}
                                </Title>
                                <Text className='registeredDate'>
                                    Registered Date: {moment(data.createdAt).format('DD.MM.YYYY - HH:mm')}
                                </Text>
                            </div>
                            <hr/>
                            <Tabs
                                defaultActiveKey={'' + activeKey.get('key')}
                                size='large'
                                items={[
                                    {
                                        label: childTitle('Posts', 'posts'),
                                        key: 'posts',
                                        children: child(data.userPosts),
                                        icon: <SnippetsFilled onClick={() => {
                                            setActiveKey('?key=posts')
                                        }}/>
                                    },
                                    {
                                        label: childTitle('Comments', 'comments'),
                                        key: 'comments',
                                        children: child(data.userComments.map((obj: { post: any; }) => obj.post)),
                                        icon: <CommentOutlined onClick={() => {
                                            setActiveKey('?key=comments')
                                        }}/>
                                    },
                                    {
                                        label: childTitle('Likes', 'likes'),
                                        key: 'likes',
                                        children: child(data.userLikes.map((obj: { post: any; }) => obj.post)),
                                        icon: <LikeOutlined onClick={() => {
                                            setActiveKey('?key=likes')
                                        }}/>
                                    },
                                ]}
                            />
                        </div>
                    ) : (
                        <div>
                            <Skeleton active/>
                        </div>
                    )
                }
            </Spin>
        </div>
    );
};

export default User;
