import React from 'react';
import {Button, Card, Form, Input, Row, Space, Spin, Typography} from "antd";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useLoginMutation, useRegisterMutation} from "../../../app/services/auth";
import {addError} from "../../../features/errors/errorSlicer";
// @ts-ignore
import {User} from "@prisma/client";
type RegisterData = Omit<User, "uuid"> & {confirmPassword: string}

const Register = () => {
    const navigate = useNavigate();
    const [registerUser] = useRegisterMutation();
    const [loginUser] = useLoginMutation();
    const [loading, setLoading] = React.useState<boolean>(false);
    const dispatch = useDispatch();

    const register = async (data: RegisterData) => {
        try {
            setLoading(true)
            await registerUser(data).unwrap();
            await loginUser(data)
            navigate("/");
        } catch (error) {
            dispatch(addError(error));
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className='register p-14'>
            <Row align='middle' justify='center'>
                <Card title='Register'  className='w-1/3'>
                    <Spin spinning={loading}>
                        <Form
                            onFinish={register}
                            name="normal_reg"
                            className="reg-form"
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
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Username!',
                                        type: "string"
                                    },
                                ]}
                            >
                                <Input placeholder="Username"/>
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

                            <Form.Item
                                name="confirmPassword"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Wrong repeat Password',
                                    }, ({getFieldValue}) => ({
                                        validator(_, value) {
                                            if (value == getFieldValue(("password"))) {
                                                return Promise.resolve();
                                            } else {
                                                return Promise.reject();
                                            }
                                        }
                                    })]}>
                                <Input.Password
                                    type="confirmPassword"
                                    placeholder="Repeat Password"
                                    autoComplete={'off'}
                                />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="reg-form-button w-full">
                                    Register
                                </Button>
                            </Form.Item>
                        </Form>
                        <Space direction="vertical" size="large">
                            <Typography.Text>
                                Are you have an account? <Link to='/login'>Login</Link>
                            </Typography.Text>
                        </Space>
                    </Spin>
                </Card>
            </Row>
        </div>
    );
};

export default Register;
