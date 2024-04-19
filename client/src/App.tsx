import React from 'react';
import {RouterProvider} from 'react-router-dom';
import Layout, {Content, Footer, Header} from "antd/lib/layout/layout";
import {HeaderMainComp} from "./components/header";
import {routers} from "./routers";
import {FooterMainComp} from "./components/footer";

export const App = () => {
    return (
        <div className='App'>
                <Layout>
                    <Header>
                        <HeaderMainComp/>
                    </Header>
                    <Content>
                        <RouterProvider router={routers}/>
                    </Content>
                    <Footer style={{display: "inline-grid"}}>
                        <FooterMainComp />
                    </Footer>
                </Layout>
        </div>
    );
};
