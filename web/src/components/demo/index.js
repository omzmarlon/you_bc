'use strict';

// libs
import React, {Component} from 'react'
import Header from "../common/Header";
import {PRIMARY_BLUE} from "../../constants/color";
// components

// styles

class Demo extends Component {
    render() {
        return (
            <div>
                <Header
                    title={"曾今的人"}
                    actionLeft={<button>abc</button>}
                    color={PRIMARY_BLUE}
                    actionRight={<button>abc</button>}
                />
            </div>
        );
    }
}

export default Demo;