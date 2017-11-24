'use strict';

import React, {Component} from 'react';
import './app.less';
import reactIcon from "../public/react_icon.png";

const DummyApp = (props) => {
    return (
        <div className="app">
            <p>This is a {props.name}!</p>
            <img src={reactIcon}/>
        </div>
    );
};

export default class App extends Component {
    render() {
        if (process.env.NODE_ENV !== 'production') {
            return <DummyApp name="dev app"/>;
        }
        return <DummyApp name="prod app"/>;
    }
}