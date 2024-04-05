import React, {useState} from "react";
import {ConfigProvider, Layout, Switch, theme} from 'antd';

// routes
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {paths} from "./paths";
import {home} from "./pages/home";
import {login} from "./pages/auth/login";

const {defaultAlgorithm, darkAlgorithm} = theme;
const {Header, Footer, Content} = Layout;


const router = createBrowserRouter([
    {
        path: paths.home,
        element: home()
    },
    {
        path: paths.login,
        element: login()
    },
    {
        path: paths.register,
        element: <p>register</p>
    },
])

export const App = () => {
    const [isLightTheme, setIsLightTheme] = useState(false);

    const handleSwitch = () => {
        setIsLightTheme((previousValue) => !previousValue);
    };

    return (
        <ConfigProvider theme={{algorithm: isLightTheme ? defaultAlgorithm : darkAlgorithm}}>
            <Layout>
                <Header>
                    <Switch checkedChildren="Light" unCheckedChildren="Dark" onClick={handleSwitch}/>
                </Header>
                <Content>
                    <RouterProvider router={router}/>
                </Content>
                <Footer>Footer</Footer>
            </Layout>
        </ConfigProvider>
    );
};
