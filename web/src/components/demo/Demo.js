'use strict';

// libs
import React, {Component} from 'react'
import IconButton from 'material-ui/IconButton';
// components
import NavHeader from "../common/NavHeader";
import Tag from "../common/Tag";
import PokeAvatar from '../common/PokeAvatar';
// assets
import DemoAndroidIcon from '../common/svg/DemoAndroidIcon';
import avatar from "../../../public/panda_avatar.jpeg";
// constants
import {PRIMARY_BLUE, PRIMARY_GREEN, SECONDARY_GREEN, PRIMARY_WHITE} from "../../styles/constants/colors";
import InfoBar from "../common/InfoBar";
import Slidable from "../common/Slidable";
//styles
import "../../styles/constants/fonts.less";
import "./Demo.less"
import "../../styles/constants/icon.less";

class Demo extends Component {
    render() {
        return (
            <div className={"demo"}>
                <NavHeader
                    title={"曾今的人"}
                    color={PRIMARY_BLUE}
                    iconRight={<DemoAndroidIcon color={PRIMARY_WHITE} className={"common-icon"}/>}
                />
                <div>Tag Demo</div>
                <div style={{margin:28}}>
                    <Tag text={"计算机"} bkgColor={SECONDARY_GREEN} textColor={PRIMARY_GREEN}/>
                </div>
                <br/>
                <br/>
                <br/>
                <hr/>
                <div>Avatar Demo</div>
                <div style={{margin:28}}>
                    <PokeAvatar img={avatar}/>
                    <PokeAvatar img={avatar} name='张无忌'/>
                    <PokeAvatar
                        img={avatar}
                        name="杨过"
                        info={{
                            gender: 'male',
                            age: 26,
                            constellation: '射手座'
                        }}/>
                </div>
                <br/>
                <br/>
                <br/>
                <hr/>
                <div>Card Demo</div>
                <br/>
                <br/>
                <br/>
                <hr/>
                <div>Slidable demo</div>
                <Slidable element={
                    <div style={{
                        width: '100%',
                        height: '300px',
                        backgroundColor: 'red',
                        display:'flex', justifyContent: 'center', alignItems: 'center'
                    }}
                    >
                        <span className={'common-font'}>
                            滑动样本，可以左滑右滑。
                            如果滑动较小会自动复位，如果滑动超过threshold会自动滑出100%
                        </span>
                    </div>
                }/>

                <InfoBar msg={"展示如果很多字会不会换行这个是提示框样本"} show={true}/>
                <InfoBar msg={"这个看不到这个看不到这个看不到这个看不到这个看不到"} show={false}/>
            </div>
        );
    }
}

export default Demo;