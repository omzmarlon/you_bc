'use strict';

import React, {Component} from 'react';
import './app.less';
import reactIcon from "../public/react_icon.png";

export default class App extends Component {
    render() {
        return (
            <div className="app">
                <p>This is a start!</p>
                <img src={reactIcon}/>
            </div>
        );
    }
}