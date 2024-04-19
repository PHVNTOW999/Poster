import {paths} from "../../../routers";
import {Link} from "react-router-dom";

export const Login = () => {
    return (
        <div>
            login
            <Link to={paths.home}>Home</Link>
        </div>
    );
};

