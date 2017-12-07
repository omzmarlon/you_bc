'use strict';

// libs
import React, {Component} from 'react'
import Header from "../common/Header";
import {PRIMARY_BLUE, PRIMARY_GREEN, SECONDARY_GREEN} from "../../styles/constants/colors";
import Tag from "../common/Tag";
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
                <Header
                    title={"曾今的人"}
                    actionLeft={<button>abc</button>}
                    color={PRIMARY_BLUE}
                />
                <Tag text={"计算机"} bkgColor={SECONDARY_GREEN} textColor={PRIMARY_GREEN}/>
            </div>
        );
    }
}

export default Demo;