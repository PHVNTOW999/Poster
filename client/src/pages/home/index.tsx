import {Link} from "react-router-dom";
import {paths} from "../../routers";

export const Home = () => {
    return (
        <div>
            Home
            <Link to={paths.login}>{paths.login}</Link>
        </div>
    );
};
