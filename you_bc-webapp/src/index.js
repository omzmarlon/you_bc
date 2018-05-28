'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import App from './containers/App';
import { BrowserRouter } from "react-router-dom";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import InfoBar from "./components/common/InfoBar";
import GlobalSpinner from "./components/common/GlobalSpinner";
import {isMobileBrowser} from "./utils/Util";
import UseMobile from "./components/errorPage/UseMobile";

// const preloadedState = window.__PRELOADED_STATE__;  // for server-side rendering
const store = configureStore({});

ReactDOM.render(
    <MuiThemeProvider>
        <Provider store={store}>
            {
                isMobileBrowser()?
                    <div>
                        <InfoBar/>
                        <GlobalSpinner/>
                        <BrowserRouter>
                            <App />
                        </BrowserRouter>
                    </div>:
                    <UseMobile />
            }
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('root')
);