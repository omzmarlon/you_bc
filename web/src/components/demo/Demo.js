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
import {PRIMARY_BLUE, PRIMARY_GREEN, SECONDARY_GREEN} from "../../styles/constants/colors";
import InfoBar from "../common/InfoBar";
import Slidable from "../common/Slidable";

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
                    actionRight={<IconButton><DemoAndroidIcon/></IconButton>}
                />
                <br/>
                <br/>
                <br/>
                <hr/>
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
                    <div style={{width: '100%', height: '300px', backgroundColor: 'red'}}>
                        abcdefgh
                    </div>
                }/>

                <InfoBar msg={"展示如果很多字会不会换行展示如果很多字会不会换行展示如果很多字"} show={true}/>
                <InfoBar msg={"这个看不到这个看不到这个看不到这个看不到这个看不到"} show={false}/>
            </div>
        );
    }
}

export default Demo;