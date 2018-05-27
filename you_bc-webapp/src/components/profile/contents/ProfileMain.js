'use strict';
import React from "react";
import PropTypes from "prop-types";
import {CLASSMATES, FRIENDS, PERSONAL, ROOMMATES} from "../../../constants/api";
//colors
import {
    PRIMARY_BLUE,
    PRIMARY_GREEN,
    PRIMARY_RED,
    PRIMARY_WHITE,
    PRIMARY_YELLOW,
    SECONDARY_BLUE,
    SECONDARY_RED,
    SECONDARY_YELLOW
} from "../../../styles/constants/colors";
//components
import Tag from "../../common/Tag";
import TruncateText from "../../common/TruncateText";
import ProfileCard from "../../common/card/ProfileCard";
import FormGroup from "./FormGroup";
import InfoRowTitle from "../../common/InfoRowTitle";
import AvatarBar from "./AvatarBar";
import {RaisedButton} from "material-ui";
//icons
import AccountIcon from "material-ui/svg-icons/action/account-circle";
import WeChatIcon from "../../common/svg/WeChatIcon";
import MajorIcon from "../../common/svg/MajorIcon";
import CourseIcon from "../../common/svg/CourseIcon";
import MottoIcon from "../../common/svg/MottoIcon";
import TagIcon from "../../common/svg/TagIcon";
import FacultyIcon from "../../common/svg/FacultyIcon";
import RelationshipIcon from "../../common/svg/RelationshipIcon";
import HometownIcon from "../../common/svg/HometownIcon";
import LocationIcon from "../../common/svg/LocationIcon";
import AgeIcon from "material-ui/svg-icons/social/cake";
import ConstellationIcon from "material-ui/svg-icons/image/brightness-3";
//redux
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
    showClassMatesForm,
    showFriendsForm,
    showPersonalForm,
    showRoommatesForm
} from "../../../actions/profile/profileUIActions";
import MixGenderIcon from "../../common/svg/MixGenderIcon";
import {signOut} from "../../../actions/global/authenticationActions";

const cardMargin = {margin:15};
const rightElementSpaceApart = {paddingLeft: 16};
const rightElementContentList = {display: 'flex'};
const tagSpacing = {marginRight: 3};
const profileCardTruncateTextSpecial = {maxWidth: '50vw'};

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
                        leftElement: <InfoRowTitle icon={<WeChatIcon color={PRIMARY_GREEN}/>} text={'WeChat'}/>,
                        rightElement: <span style={rightElementSpaceApart}>{props.personal.weChatId || "Unknown"}</span>
                    },
                    {
                        leftElement: <InfoRowTitle icon={<AccountIcon color={PRIMARY_GREEN}/>} text={'Nickname'}/>,
                        rightElement: <span style={rightElementSpaceApart}>{props.personal.username}</span>
                    },
                    {
                        leftElement: <InfoRowTitle icon={<MixGenderIcon color={PRIMARY_GREEN}/>} text={'Gender'}/>,
                        rightElement: <span style={rightElementSpaceApart}>{props.personal.sex || "Unknown"}</span>
                    },
                    {
                        leftElement: <InfoRowTitle icon={<AgeIcon color={PRIMARY_GREEN}/>} text={'Age'}/>,
                        rightElement: <span style={rightElementSpaceApart}>
                            {/*so that age display won't be zero*/}
                            {props.personal.age?props.personal.age:'Unknown'}
                        </span>
                    },
                    {
                        leftElement: <InfoRowTitle icon={<ConstellationIcon color={PRIMARY_GREEN}/>} text={'Horoscope'}/>,
                        rightElement: <span style={rightElementSpaceApart}>{props.personal.constellation || "Unknown"}</span>
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
                        leftElement: <InfoRowTitle icon={<MajorIcon color={PRIMARY_RED}/>} text={'Major'} />,
                        rightElement: <TruncateText
                            style={{...rightElementSpaceApart, ...profileCardTruncateTextSpecial}}
                            text={props.classmates.major || "Unknown"}
                            modalTitle="Major"
                        />
                    },
                    {
                        leftElement: <InfoRowTitle icon={<CourseIcon color={PRIMARY_RED}/>} text={'Courses'}/>,
                        rightElement:
                            <div style={rightElementSpaceApart}>
                                {
                                    props.classmates.courses.length !== 0 ?
                                        props.classmates.courses.map((c, i) => <span key={i}>{c} </span>) :
                                        "Unknown"
                                }
                            </div>
                    },
                    {
                        leftElement: <InfoRowTitle icon={<MottoIcon color={PRIMARY_RED}/>} text={'Ability'}/>,
                        rightElement: <TruncateText
                            style={{...rightElementSpaceApart, ...profileCardTruncateTextSpecial}}
                            text={props.classmates.motto || "Unknown"}
                            maxLength={22}
                            modalTitle="Study Ability"
                        />
                    },
                    {
                        leftElement: <InfoRowTitle icon={<TagIcon color={PRIMARY_RED}/>} text={"Let's"}/>,
                        rightElement:
                            <div style={Object.assign({}, rightElementSpaceApart, rightElementContentList)}>
                                {
                                    props.classmates.tags.length !== 0 ?
                                        props.classmates.tags.map((t, i) =>
                                            <Tag style={tagSpacing} key={i} text={t} bkgColor={SECONDARY_RED} textColor={PRIMARY_RED}/>
                                        ) : "Unknown"
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
                        leftElement: <InfoRowTitle icon={<FacultyIcon color={PRIMARY_YELLOW}/>} text={'Faculty'}/>,
                        rightElement: <span style={rightElementSpaceApart}>{props.friends.faculty || "Unknown"}</span>
                    },
                    {
                        leftElement: <InfoRowTitle icon={<RelationshipIcon color={PRIMARY_YELLOW}/>} text={'Relationship'}/>,
                        rightElement: <span style={rightElementSpaceApart}>{props.friends.relationship || "Unknown"}</span>
                    },
                    {
                        leftElement: <InfoRowTitle icon={<MottoIcon color={PRIMARY_YELLOW}/>} text={'Life Motto'}/>,
                        rightElement: <TruncateText
                            style={{...rightElementSpaceApart, ...profileCardTruncateTextSpecial}}
                            text={props.friends.motto || "Unknown"}
                            maxLength={22}
                            modalTitle="Signature"
                        />
                    },
                    {
                        leftElement: <InfoRowTitle icon={<TagIcon color={PRIMARY_YELLOW}/>} text={'Interests'}/>,
                        rightElement:
                            <div style={Object.assign({}, rightElementSpaceApart, rightElementContentList)}>
                                {
                                    props.friends.tags.length !== 0 ?
                                        props.friends.tags.map((t, i) =>
                                            <Tag style={tagSpacing}
                                                 key={i}
                                                 text={t}
                                                 bkgColor={SECONDARY_YELLOW}
                                                 textColor={PRIMARY_YELLOW}
                                            />) :
                                        "Unknown"
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
                        leftElement: <InfoRowTitle icon={<LocationIcon color={PRIMARY_BLUE}/>} text={'Location'}/>,
                        rightElement: <span style={rightElementSpaceApart}>{props.roommates.location || "Unknown"}</span>
                    },
                    {
                        leftElement: <InfoRowTitle icon={<HometownIcon color={PRIMARY_BLUE}/>} text={'Hometown'}/>,
                        rightElement: <span style={rightElementSpaceApart}>{props.roommates.hometown || "Unknown"}</span>
                    },
                    {
                        leftElement: <InfoRowTitle icon={<MottoIcon color={PRIMARY_BLUE}/>} text={'About Me'}/>,
                        rightElement: <TruncateText
                            style={{...rightElementSpaceApart, ...profileCardTruncateTextSpecial}}
                            text={props.roommates.motto || "Unknown"}
                            maxLength={22}
                            modalTitle="About Me"
                        />
                    },
                    {
                        leftElement: <InfoRowTitle icon={<TagIcon color={PRIMARY_BLUE}/>} text={'Habits'}/>,
                        rightElement:
                            <div style={Object.assign({}, rightElementSpaceApart, rightElementContentList)}>
                                {
                                    props.roommates.tags.length !== 0 ?
                                        props.roommates.tags.map((t, i) =>
                                            <Tag style={tagSpacing} key={i} text={t} bkgColor={SECONDARY_BLUE} textColor={PRIMARY_BLUE}/>
                                        ) : "Unknown"
                                }
                            </div>
                    }
                ]}
            />
        </div>
        <div style={{width: "90%", margin: "auto"}}>
            <RaisedButton
                onClick={() => {props.signOut()}}
                backgroundColor={PRIMARY_GREEN}
                fullWidth={true}
                style={{marginBottom: 12}}
                label="Sign out"
                labelColor={PRIMARY_WHITE}
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
            signOut
        }, dispatch
    )
);

export default connect(mapStateToProps, mapDispatchToProps)(ProfileMain);