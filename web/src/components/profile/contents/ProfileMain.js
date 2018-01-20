'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import {CLASSMATES, FRIENDS, PERSONAL, ROOMMATES} from "../../../constants/api";
//colors
import {
    PRIMARY_BLUE, PRIMARY_GREEN, PRIMARY_RED, PRIMARY_YELLOW, SECONDARY_BLUE, SECONDARY_RED, SECONDARY_YELLOW
} from "../../../styles/constants/colors";
//components
import Tag from "../../common/Tag";
import TruncateText from "../../common/TruncateText";
import ProfileCard from "../../common/card/ProfileCard";
import FormGroup from './FormGroup';
import InfoRowTitle from "../../common/InfoRowTitle";
import AvatarBar from "./AvatarBar";
//icons
import AccountIcon from 'material-ui/svg-icons/action/account-circle';
import WeChatIcon from "../../common/svg/WeChatIcon";
import MajorIcon from "../../common/svg/MajorIcon";
import CourseIcon from "../../common/svg/CourseIcon";
import MottoIcon from "../../common/svg/MottoIcon";
import TagIcon from "../../common/svg/TagIcon";
import FacultyIcon from "../../common/svg/FacultyIcon";
import RelationshipIcon from "../../common/svg/RelationshipIcon";
import HometownIcon from "../../common/svg/HometownIcon";
import LocationIcon from "../../common/svg/LocationIcon";
import AgeIcon from 'material-ui/svg-icons/social/cake';
import ConstellationIcon from 'material-ui/svg-icons/image/brightness-3';
//redux
import { connect }  from 'react-redux'
import { bindActionCreators } from 'redux';
import {
    showClassMatesForm, showFriendsForm, showPersonalForm, showRoommatesForm
} from "../../../actions/profile/profileUIActions";
import MixGenderIcon from "../../common/svg/MixGenderIcon";

const cardMargin = {margin:15};
const rightElementSpaceApart = {paddingLeft: 16};
const rightElementContentList = {display: 'flex'};
const tagSpacing = {marginRight: 3};

const ProfileMain = (props) => (
    <div>
        <div style={cardMargin}>
            <AvatarBar/>
        </div>
        <div style={cardMargin}>
            <ProfileCard
                onClickEdit={props.openPersonalEdit}
                type={PERSONAL}
                contentList={[
                    {
                        leftElement: <InfoRowTitle icon={<WeChatIcon color={PRIMARY_GREEN}/>} text={'微信号'}/>,
                        rightElement: <span style={rightElementSpaceApart}>{props.personal.values.weChatId}</span>
                    },
                    {
                        leftElement: <InfoRowTitle icon={<AccountIcon color={PRIMARY_GREEN}/>} text={'昵称'}/>,
                        rightElement: <span style={rightElementSpaceApart}>{props.personal.values.username}</span>
                    },
                    {
                        leftElement: <InfoRowTitle icon={<MixGenderIcon color={PRIMARY_GREEN}/>} text={'性别'}/>,
                        rightElement: <span style={rightElementSpaceApart}>{props.personal.values.sex}</span>
                    },
                    {
                        leftElement: <InfoRowTitle icon={<AgeIcon color={PRIMARY_GREEN}/>} text={'年龄'}/>,
                        rightElement: <span style={rightElementSpaceApart}>{props.personal.values.age}</span>
                    },
                    {
                        leftElement: <InfoRowTitle icon={<ConstellationIcon color={PRIMARY_GREEN}/>} text={'星座'}/>,
                        rightElement: <span style={rightElementSpaceApart}>{props.personal.values.constellation}</span>
                    }
                ]}
            />
        </div>
        <div style={cardMargin}>
            <ProfileCard
                onClickEdit={props.openClassmatesEdit}
                type={CLASSMATES}
                contentList={[
                    {
                        leftElement: <InfoRowTitle icon={<MajorIcon color={PRIMARY_RED}/>} text={'专业'} />,
                        rightElement: <TruncateText style={rightElementSpaceApart} text={props.classmates.values.major} />
                    },
                    {
                        leftElement: <InfoRowTitle icon={<CourseIcon color={PRIMARY_RED}/>} text={'课程'}/>,
                        rightElement:
                            <div style={rightElementSpaceApart}>
                                {
                                    props.classmates.values.courses.map((c, i) =>
                                        <span key={i}>{c} </span>
                                    )
                                }
                            </div>
                    },
                    {
                        leftElement: <InfoRowTitle icon={<MottoIcon color={PRIMARY_RED}/>} text={'能力'}/>,
                        rightElement: <TruncateText style={rightElementSpaceApart} text={props.classmates.values.motto} />
                    },
                    {
                        leftElement: <InfoRowTitle icon={<TagIcon color={PRIMARY_RED}/>} text={'兴趣'}/>,
                        rightElement:
                            <div style={Object.assign({}, rightElementSpaceApart, rightElementContentList)}>
                                {
                                    props.classmates.values.tags.map((t, i) =>
                                        <Tag style={tagSpacing} key={i} text={t} bkgColor={SECONDARY_RED} textColor={PRIMARY_RED}/>
                                    )
                                }
                            </div>
                    }
                ]}
            />
        </div>
        <div style={cardMargin}>
            <ProfileCard
                onClickEdit={props.openFriendsEdit}
                type={FRIENDS}
                contentList={[
                    {
                        leftElement: <InfoRowTitle icon={<FacultyIcon color={PRIMARY_YELLOW}/>} text={'学院'}/>,
                        rightElement: <span style={rightElementSpaceApart}>{props.friends.values.faculty}</span>
                    },
                    {
                        leftElement: <InfoRowTitle icon={<RelationshipIcon color={PRIMARY_YELLOW}/>} text={'情感状况'}/>,
                        rightElement: <span style={rightElementSpaceApart}>{props.friends.values.relationship}</span>
                    },
                    {
                        leftElement: <InfoRowTitle icon={<MottoIcon color={PRIMARY_YELLOW}/>} text={'自我描述'}/>,
                        rightElement: <TruncateText style={rightElementSpaceApart} text={props.friends.values.motto} />
                    },
                    {
                        leftElement: <InfoRowTitle icon={<TagIcon color={PRIMARY_YELLOW}/>} text={'兴趣'}/>,
                        rightElement:
                            <div style={Object.assign({}, rightElementSpaceApart, rightElementContentList)}>
                                {
                                    props.friends.values.tags.map((t, i) =>
                                        <Tag style={tagSpacing} key={i} text={t} bkgColor={SECONDARY_YELLOW} textColor={PRIMARY_YELLOW}/>
                                    )
                                }
                            </div>
                    }
                ]}
            />
        </div>
        <div style={cardMargin}>
            <ProfileCard
                onClickEdit={props.openRoommatesEdit}
                type={ROOMMATES}
                contentList={[
                    {
                        leftElement: <InfoRowTitle icon={<LocationIcon color={PRIMARY_BLUE}/>} text={'地点'}/>,
                        rightElement: <span style={rightElementSpaceApart}>{props.roommates.values.location}</span>
                    },
                    {
                        leftElement: <InfoRowTitle icon={<HometownIcon color={PRIMARY_BLUE}/>} text={'家乡'}/>,
                        rightElement: <span style={rightElementSpaceApart}>{props.roommates.values.hometown}</span>
                    },
                    {
                        leftElement: <InfoRowTitle icon={<MottoIcon color={PRIMARY_BLUE}/>} text={'自我描述'}/>,
                        rightElement: <TruncateText style={rightElementSpaceApart} text={props.roommates.values.motto} />
                    },
                    {
                        leftElement: <InfoRowTitle icon={<TagIcon color={PRIMARY_BLUE}/>} text={'兴趣'}/>,
                        rightElement:
                            <div style={Object.assign({}, rightElementSpaceApart, rightElementContentList)}>
                                {
                                    props.roommates.values.tags.map((t, i) =>
                                        <Tag style={tagSpacing} key={i} text={t} bkgColor={SECONDARY_BLUE} textColor={PRIMARY_BLUE}/>
                                    )
                                }
                            </div>
                    }
                ]}
            />
        </div>
        <FormGroup />
    </div>
);

ProfileMain.propTypes = {
    // states
    classmates: PropTypes.object.isRequired,// from redux store
    roommates: PropTypes.object.isRequired,// from redux store
    friends: PropTypes.object.isRequired, // from redux store
    personal: PropTypes.object.isRequired, // from redux store
    global: PropTypes.object.isRequired,// from redux store

    // actions
    // open forms
    openClassmatesEdit: PropTypes.func.isRequired,
    openRoommatesEdit: PropTypes.func.isRequired,
    openFriendsEdit: PropTypes.func.isRequired,
    openPersonalEdit: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    classmates: state.profile.classmates,
    roommates: state.profile.roommates,
    friends: state.profile.friends,
    personal: state.profile.personal,
    global: state.global
});

const mapDispatchToProps = (dispatch) => (
    bindActionCreators(
        {
            openClassmatesEdit: showClassMatesForm,
            openRoommatesEdit: showRoommatesForm,
            openFriendsEdit: showFriendsForm,
            openPersonalEdit: showPersonalForm,
        }, dispatch
    )
);

export default connect(mapStateToProps, mapDispatchToProps)(ProfileMain);