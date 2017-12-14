'use strict';

// libs
import React, {Component} from 'react'
// components
import NavHeader from "../common/NavHeader";
import Tag from "../common/Tag";
import PokeAvatar from '../common/PokeAvatar';
import TruncateText from '../common/TruncateText';
import RaisedButton from 'material-ui/RaisedButton';
import SearchResultCard from '../common/card/SearchResultCard';
import MatchedUserCard from '../common/card/MatchedUserCard';
import ProfileCard from '../common/card/ProfileCard';
import InfoBar from "../common/InfoBar";
import Modal from "../common/Modal";
import Slidable from "../common/Slidable";
// assets
import DemoAndroidIcon from '../common/svg/DemoAndroidIcon';
import avatar from "../../../public/panda_avatar.jpeg";
import placeholder from '../../../public/avatar_placeholder.png';
import SchoolIcon from 'material-ui/svg-icons/social/school';
import DraftIcon from 'material-ui/svg-icons/content/drafts';
import MailIcon from 'material-ui/svg-icons/content/mail';
// constants
import {PRIMARY_BLUE, PRIMARY_GREEN, SECONDARY_GREEN, PRIMARY_YELLOW, PRIMARY_WHITE} from "../../styles/constants/colors";
import {CLASSMATES, ROOMMATES, FRIENDS} from '../../constants/api';
//styles
import "../../styles/constants/fonts.less";
import "./Demo.less"
import "../../styles/constants/icon.less";

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
            <div className={"demo"}>
                <NavHeader
                    title={"曾今的人"}
                    color={PRIMARY_BLUE}
                    iconRight={<DemoAndroidIcon color={PRIMARY_WHITE} className={"common-icon"}/>}
                />
                <div>Slidable demo</div>
                <Slidable element={
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
                }/>
                <Slidable element={
                    <div style={{margin:28}}>
                        <ProfileCard
                            type={CLASSMATES}
                            contentList={[
                                {
                                    leftElement: <span>专业</span>,
                                    rightElement: <TruncateText style={{paddingLeft: 16}} text="汽修专业 大一" />
                                },
                                {
                                    leftElement: <span>课程</span>,
                                    rightElement: <div style={{paddingLeft: 16}}><Tag text='CPSC 310' bkgColor={SECONDARY_GREEN} textColor={PRIMARY_GREEN}/></div>
                                },
                                {
                                    leftElement: <span>能力</span>,
                                    rightElement: <span style={{paddingLeft: 16}}>我其实是个学霸</span>
                                },
                                {
                                    leftElement: <span>兴趣: </span>,
                                    rightElement: <TruncateText textStyle={{width: 300}} style={{paddingLeft: 16}} text="这个超长的这个超长的这个超长的这个超长的这个超长的这个超长的这个超长的这个超长的"/>
                                }
                            ]}
                        />
                    </div>
                }/>
                <Slidable element={
                    <div style={{margin:28}}>
                        <MatchedUserCard
                            type={FRIENDS}
                            avatar={avatar}
                            name="冬瓜"
                            weChatId="donggua"
                            tags={['吃吃吃', '买买买', '啪啪啪']}
                        />
                    </div>
                }/>

                {/*<InfoBar msg={"展示如果很多字会不会换行这个是提示框样本"} show={true}/>*/}
                <RaisedButton onClick={this.toggleOpenModal}>
                    show modal
                </RaisedButton>

                <Modal open={this.state.openModal}>
                    <div>some text</div>
                    <RaisedButton onClick={this.toggleOpenModal} label="确认" fullWidth={true} backgroundColor={PRIMARY_GREEN} />
                </Modal>

                <InfoBar msg={"这个看不到这个看不到这个看不到这个看不到这个看不到"} show={false}/>
            </div>
        );
    }
}

export default Demo;