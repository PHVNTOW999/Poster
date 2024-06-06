import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, Card, Form, Input, Row, Spin} from "antd";
import NotAuth from "../notAuth/index";
import {addError} from "../../features/errors/errorSlicer";

type Props = {
    title: string;
    submitName?: string;
    submit?: any;
    refetch?: any;
}

const PostForm = ({title, submitName, refetch, submit}: Props) => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const auth = useSelector((state: any) => state.auth);
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const onFinish = async (data: any) => {
        try {
            setLoading(true)
            await submit(data)
            form.resetFields()
        } catch (err) {
            dispatch(addError(err));
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
                                        onFinish={onFinish}
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
                                                {submitName || 'Submit'}
                                            </Button>
                                        </Form.Item>
                                    </Form>
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