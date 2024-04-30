import {Alert} from "antd";

type Props = {
    message?: string;
}
export const Error = ({message}: Props) => {
    if(!message) {
        return null
    } else {
        return <Alert message={message} type="error"/>
    }
}