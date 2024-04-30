import React from 'react';
import {createRoot} from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css';
import {App} from "./App";
import {store} from "./app/store";
import {Provider} from "react-redux";
import {ConfigProvider, theme} from "antd";
import {Auth} from "./features/auth/auth";

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ConfigProvider theme={{algorithm: theme.darkAlgorithm}}>
                <Auth>
                    <App/>
                </Auth>
            </ConfigProvider>
        </Provider>
    </React.StrictMode>
);

reportWebVitals();
