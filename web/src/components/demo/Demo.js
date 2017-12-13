'use strict';

// libs
import React, {Component} from 'react'
import IconButton from 'material-ui/IconButton';
// components
import NavHeader from "../common/NavHeader";
import Tag from "../common/Tag";
import PokeAvatar from '../common/PokeAvatar';
import ProfileCard from '../common/card/ProfileCard';
import TruncateText from '../common/TruncateText';
import RaisedButton from 'material-ui/RaisedButton';
import SearchResultCard from '../common/card/SearchResultCard';
import ProfileCard from '../common/card/ProfileCard';
import TruncateText from '../common/TruncateText';
import InfoBar from "../common/InfoBar";

// assets
import DemoAndroidIcon from '../common/svg/DemoAndroidIcon';
import avatar from "../../../public/panda_avatar.jpeg";
import placeholder from '../../../public/avatar_placeholder.png';
import SchoolIcon from 'material-ui/svg-icons/social/school';
import DraftIcon from 'material-ui/svg-icons/content/drafts';
import MailIcon from 'material-ui/svg-icons/content/mail';
// constants
import {PRIMARY_BLUE, PRIMARY_GREEN, SECONDARY_GREEN, PRIMARY_YELLOW} from "../../styles/constants/colors";
import InfoBar from "../common/InfoBar";
import Modal from "../common/Modal";
import {CLASSMATES, ROOMMATES, FRIENDS} from '../../constants/api';

class Demo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openModal: false
        };
        this.toggleOpenModal = this.toggleOpenModal.bind(this);
    }

    toggleOpenModal() {
        // just for demo
        this.setState({openModal: !this.state.openModal});
    }

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
                <div style={{margin:28}}>
                    <SearchResultCard
                        avatar={placeholder}
                        name="小傻瓜"
                        gender='male'
                        age={8}
                        constellation='电插座'
                        contentList={[
                            {
                                leftElement: <SchoolIcon color={PRIMARY_YELLOW}/>,
                                rightElement: <TruncateText style={{paddingLeft: 16}} text="汽修专业 大一" />
                            },
                            {
                                leftElement: <DraftIcon color={PRIMARY_YELLOW}/>,
                                rightElement: <span style={{paddingLeft: 16}}>好好学习</span>
                            },
                            {
                                leftElement: <MailIcon color={PRIMARY_YELLOW}/>,
                                rightElement: <span style={{paddingLeft: 16}}>我其实是个学霸</span>
                            },
                            {
                                leftElement: <span>兴趣: </span>,
                                rightElement: <TruncateText textStyle={{width: 300}} style={{paddingLeft: 16}} text="这个超长的这个超长的这个超长的这个超长的这个超长的这个超长的这个超长的这个超长的"/>
                            }
                        ]}
                    />
                </div>
                <div style={{margin:28}}>
                    <ProfileCard
                        type={CLASSMATES}
                        contentList={[
                            {
                                leftElement: <SchoolIcon color={PRIMARY_YELLOW}/>,
                                rightElement: <TruncateText style={{paddingLeft: 16}} text="汽修专业 大一" />
                            },
                            {
                                leftElement: <DraftIcon color={PRIMARY_YELLOW}/>,
                                rightElement: <span style={{paddingLeft: 16}}>好好学习</span>
                            },
                            {
                                leftElement: <MailIcon color={PRIMARY_YELLOW}/>,
                                rightElement: <span style={{paddingLeft: 16}}>我其实是个学霸</span>
                            },
                            {
                                leftElement: <span>兴趣: </span>,
                                rightElement: <TruncateText textStyle={{width: 300}} style={{paddingLeft: 16}} text="这个超长的这个超长的这个超长的这个超长的这个超长的这个超长的这个超长的这个超长的"/>
                            }
                        ]}
                    />
                </div>
                <br/>
                <br/>
                <br/>
                <hr/>
                <div>Modal Demo</div>
                <button onClick={this.toggleOpenModal}>
                    show modal
                </button>

                <Modal open={this.state.openModal}>
                    <div>some text</div>
                    <RaisedButton onClick={this.toggleOpenModal} label="确认" fullWidth={true} backgroundColor={PRIMARY_GREEN} />
                </Modal>

                <InfoBar msg={"展示如果很多字会不会换行展示如果很多字会不会换行展示如果很多字"} show={false}/>
                <InfoBar msg={"这个看不到这个看不到这个看不到这个看不到这个看不到"} show={false}/>
            </div>
        );
    }
}

export default Demo;