'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import App from './containers/App';
import { BrowserRouter } from "react-router-dom";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import InfoBar from "./components/common/InfoBar";
import TestCodePage from "./components/errorPage/TestCodePage";

// const preloadedState = window.__PRELOADED_STATE__;  // for server-side rendering
const store = configureStore({});

ReactDOM.render(
    <MuiThemeProvider>
        <Provider store={store}>
            <div>
                <InfoBar/>
                <TestCodePage/>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </div>
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('root')
);