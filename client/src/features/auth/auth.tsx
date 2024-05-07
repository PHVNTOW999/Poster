import {useCurrentQuery} from "../../app/services/auth";
import {LoadingOutlined} from '@ant-design/icons';
import {Spin} from "antd";

export const Auth = ({children}: { children: JSX.Element }) => {
    const {data, isLoading} = useCurrentQuery();
    const antIcon = <LoadingOutlined style={{fontSize: 80}} spin/>;

    if (isLoading) {
        return <Spin indicator={antIcon} className='h-screen flex items-center justify-center'/>
    }
    return children
};
