import React, {useRef, useState} from 'react';
// @ts-ignore
import {Post} from "@prisma/client";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {Button, Card, Form, Input, Row, Space, Spin} from "antd";
import {Error} from "../error";
import {useAddPostMutation} from "../../app/services/posts";
import {ErrorHandler} from "../../utils/ErrorHandler";

type Props = {
    title: string;
    refetch?: any;
}

const CustomForm = ({title, refetch}: Props) => {
    const auth = useSelector((state: any) => state.auth);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = useState('');
    // const [input, setInput] = useState("");
    const [addPost] = useAddPostMutation()
    // const gg = useRef<any>(null)

    // const handleInput = (event: any) => {
    //     setInput(event.target.value)
    //     event.preventDefault();
    //     // event.target.value = ''
    //     console.log(input)
    // }

    const CreatePost = async (data: Post) => {
        try {
            setLoading(true)
            await addPost(data).unwrap()
        } catch (error) {
            const maybeError = ErrorHandler(error);
            if (maybeError) {
                setError(error.data.message)
            } else {
                setError('Unknown error')
            }
        } finally {
            await refetch()
            // setTimeout(() => {
                // gg.current.input.value = 'hbhj'
                // setInput("7878")
            // }, 500)
            // console.log(gg.current.input.value)
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
                                                // ref={gg}
                                                placeholder="Text"
                                                allowClear
                                                // onChange={event => {setInput(event.target.value)}}
                                                // initialValues={input}
                                                // value={input}
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
                        Please
                        <Link to='/register'>Register</Link> or
                        <Link to='/login'>Login</Link>
                        for posting new Posts, Comments and likes!
                    </div>
                )
            }
        </div>
    );
};

export default CustomForm;