import React, {useEffect} from 'react';
import {message} from "antd";
import {useSelector} from "react-redux";

export const ErrorHandler = () => {

    const errors = useSelector((state: any) => state.errors);
    const [messageApi, contextHolder] = message.useMessage();

    const errorMess = (data: any) => {
        messageApi.open({
            type: 'error',
            content: `Error ${data.originalStatus}, ${data.error}`,
            duration: 1.5,
        }).then(r => null);
    };

    useEffect(() => {
        const lastError = errors.errorList.slice(-1);
        if(errors.errorList.length) errorMess(lastError[0])
    }, [errors]);

    return (
        <div className='ErrorHandler'>
            {contextHolder}
        </div>
    );
};