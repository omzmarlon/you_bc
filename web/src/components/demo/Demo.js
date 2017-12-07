'use strict';

// libs
import React, {Component} from 'react'
import NavHeader from "../common/NavHeader";
import {PRIMARY_BLUE, PRIMARY_YELLOW} from "../../styles/constants/colors";
import IconButton from 'material-ui/IconButton';
import Icon from "../common/Icon";

import DemoAndroidIcon from '../../../public/svg/DemoAndroidIcon.svg';

class Demo extends Component {
    render() {
        return (
            <div>
                <div>this string should be covered by header</div>
                <NavHeader
                    title={"曾今的人"}
                    color={PRIMARY_BLUE}
                    // NOTE:
                    // A demo on how to use actionRight
                    // we should keep our svg files in public/svg folder
                    actionRight={<IconButton><Icon src={DemoAndroidIcon}/></IconButton>}
                />
            </div>
        );
    }
}

export default Demo;