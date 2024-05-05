import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import {useUserQuery} from "../../app/services/auth";
import {Skeleton} from "antd";
import moment from "moment/moment";

const User = () => {
    const params = useParams<{ uuid: string }>();
    const {data} = useUserQuery(params.uuid || '')

    return (
        <div className='user'>
            {
                data ? (
                    <div>
                        {data.username} - {moment(data.createdAt).format('DD-MM-YYYY')}
                    </div>
                ) : (
                    <div>
                        <Skeleton active/>
                    </div>
                )
            }
        </div>
    );
};

export default User;
