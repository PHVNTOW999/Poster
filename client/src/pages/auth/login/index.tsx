import {Button, Card, Form, Input, Row, Space, Spin, Typography} from "antd";
import React, {useState} from "react";
import {useLoginMutation, UserData} from "../../../app/services/auth";
// import {ErrorHandler} from "../../../utils/ErrorHandler";
import {Link, useNavigate} from "react-router-dom";
// import {Error} from "../../../components/error";

export const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState<boolean>(false);
    const [loginUser] = useLoginMutation();
    const [error, setError] = useState('');
    const login = async (data: UserData) => {
        try {
            setLoading(true)
            await loginUser(data).unwrap();
            navigate("/")
        } catch (error) {
            // const maybeError = ErrorHandler(error);

            // if (maybeError) {
            //     setError(error.data.message);
            // } else {
            //     setError("Unknown error");
            // }
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className='login p-14'>
            <Row align='middle' justify='center'>
                <Card title='Login' className='w-1/3'>
                    <Spin spinning={loading}>
                        <Form
                            onFinish={login}
                            name="normal_login"
                            className="login-form"
                        >
                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please correct input your Email!',
                                        type: "email"
                                    },
                                ]}
                            >
                                <Input placeholder="Email"/>
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Password!',
                                    },
                                ]}
                            >
                                <Input.Password
                                    type="password"
                                    placeholder="Password"
                                    autoComplete={'off'}
                                />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button w-full">
                                    Log in
                                </Button>
                            </Form.Item>
                        </Form>
                        <Space direction="vertical" size="large">
                            <Typography.Text>
                                Don't have an account? <Link to='/register'>Register</Link>
                            </Typography.Text>
                            {/*<Error message={error}/>*/}
                        </Space>
                    </Spin>
                </Card>
            </Row>
        </div>
    );
};

