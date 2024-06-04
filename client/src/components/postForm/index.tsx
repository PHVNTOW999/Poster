import React, {useRef, useState} from 'react';
// @ts-ignore
import {Post} from "@prisma/client";
import {useSelector} from "react-redux";
import {Button, Card, Form, Input, Row, Space, Spin} from "antd";
import {Error} from "../error";
import {useAddPostMutation} from "../../app/services/posts";
import {ErrorHandler} from "../../utils/ErrorHandler";
import NotAuth from "../notAuth/index";

type Props = {
    title: string;
    refetch?: any;
}

const PostForm = ({title, refetch}: Props) => {
    const auth = useSelector((state: any) => state.auth);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = useState('');
    const [addPost] = useAddPostMutation()
    const [form] = Form.useForm();

    const CreatePost = async (data: Post) => {
        try {
            setLoading(true)
            await addPost(data).unwrap()
            await refetch()
            form.resetFields()
        } catch (error) {
            const maybeError = ErrorHandler(error);
            if (maybeError) {
                setError(error.data.message)
            } else {
                setError('Unknown error')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='Form'>
            {
                auth.isAuthenticated ? (
                    <div>
                        <Row align='middle' justify='center'>
                            <Card title={title} className='w-full'>
                                <Spin spinning={loading}>
                                    <Form
                                        form={form}
                                        onFinish={CreatePost}
                                        name="normal_login"
                                        className="login-form"
                                    >
                                        <Form.Item
                                            name="text"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input text!',
                                                },
                                            ]}
                                        >
                                            <Input
                                                placeholder="Text"
                                                allowClear
                                            />
                                        </Form.Item>

                                        <Form.Item>
                                            <Button type="primary" htmlType="submit"
                                                    className="login-form-button w-full">
                                                Submit
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                    <Space direction="vertical" size="large">
                                        <Error message={error}/>
                                    </Space>
                                </Spin>
                            </Card>
                        </Row>
                    </div>
                ) : (
                    <div>
                        <NotAuth/>
                    </div>
                )
            }
        </div>
    );
};

export default PostForm;