'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import {CLASSMATES, FRIENDS, PERSONAL, ROOMMATES} from "../../../constants/api";
//colors
import {
    PRIMARY_BLUE, PRIMARY_RED, PRIMARY_YELLOW, SECONDARY_BLUE, SECONDARY_RED, SECONDARY_YELLOW
} from "../../../styles/constants/colors";
//components
import Tag from "../../common/Tag";
import TruncateText from "../../common/TruncateText";
import ProfileCard from "../../common/card/ProfileCard";
import RoommatesForm from "../../../components/profile/forms/RoommatesForm";
import ClassmatesForm from "../../../components/profile/forms/ClassmatesForm";
import FriendsForm from "../../../components/profile/forms/FriendsForm";
//redux
import { connect }  from 'react-redux'
import { bindActionCreators } from 'redux';
import {
    hideClassmatesForm,
    hideFriendsForm, hidePersonalForm, hideRoommatesForm, showClassMatesForm, showFriendsForm, showPersonalForm,
    showRoommatesForm
} from "../../../actions/profile/profileUIActions";
import {
    updateClassmatesValues, updateFriendsValues, updatePersonalValues,
    updateRoommatesValues
} from "../../../actions/profile/profileUpdateActions";
import PersonalForm from "../forms/PersonalForm";
import {updateUsername, updateWeChatId} from "../../../actions/global/globalUpdateActions";

const cardMargin = {margin:15};
const rightElementSpaceApart = {paddingLeft: 16};
const rightElementContentList = {display: 'flex'};
const tagSpacing = {marginRight: 3};

const ProfileMain = (props) => (
    <div>
        <div style={cardMargin}>
            <ProfileCard
                onClickEdit={props.openPersonalEdit}
                type={PERSONAL}
                contentList={[
                    {
                        leftElement: <span>微信号</span>,
                        rightElement: <span style={rightElementSpaceApart}>{props.global.weChatId}</span>
                    },
                    {
                        leftElement: <span>昵称</span>,
                        rightElement: <span style={rightElementSpaceApart}>{props.global.username}</span>
                    },
                    {
                        leftElement: <span>年龄</span>,
                        rightElement: <span style={rightElementSpaceApart}>{props.personal.values.age}</span>
                    },
                    {
                        leftElement: <span>星座</span>,
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
                        leftElement: <span>专业</span>,
                        rightElement: <TruncateText style={rightElementSpaceApart} text={props.classmates.values.major} />
                    },
                    {
                        leftElement: <span>课程</span>,
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
                        leftElement: <span>能力</span>,
                        rightElement: <TruncateText style={rightElementSpaceApart} text={props.classmates.values.motto} />
                    },
                    {
                        leftElement: <span>兴趣</span>,
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
                        leftElement: <span>学院</span>,
                        rightElement: <span style={rightElementSpaceApart}>{props.friends.values.faculty}</span>
                    },
                    {
                        leftElement: <span>情感状况</span>,
                        rightElement: <span style={rightElementSpaceApart}>{props.friends.values.relationship}</span>
                    },
                    {
                        leftElement: <span>自我描述</span>,
                        rightElement: <TruncateText style={rightElementSpaceApart} text={props.friends.values.motto} />
                    },
                    {
                        leftElement: <span>兴趣</span>,
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
                        leftElement: <span>地点</span>,
                        rightElement: <span style={rightElementSpaceApart}>{props.roommates.values.location}</span>
                    },
                    {
                        leftElement: <span>家乡</span>,
                        rightElement: <span style={rightElementSpaceApart}>{props.roommates.values.hometown}</span>
                    },
                    {
                        leftElement: <span>自我描述</span>,
                        rightElement: <TruncateText style={rightElementSpaceApart} text={props.roommates.values.motto} />
                    },
                    {
                        leftElement: <span>兴趣</span>,
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
        <ClassmatesForm showForm={props.showClassmatesForm}
                        major={props.classmates.values.major}
                        courses={props.classmates.values.courses}
                        motto={props.classmates.values.motto}
                        tags={props.classmates.values.tags}
                        majorOptions={props.classmates.options.majorOptions}
                        coursesOptions={props.classmates.options.coursesOptions}
                        tagsOptions={props.classmates.options.tagsOptions}
                        onDone={props.onClassmatesUpdate}
                        onClose={props.closeClassmatesEdit}
                        showWeChatInput={!props.global.weChatId}
                        weChatId={props.global.weChatId}
                        onWeChatIdDone={props.onWeChatIdDone}
        />
        <FriendsForm showForm={props.showFriendsForm}
                     faculty={props.friends.values.faculty}
                     relationship={props.friends.values.relationship}
                     motto={props.friends.values.motto}
                     tags={props.friends.values.tags}
                     facultyOptions={props.friends.options.facultyOptions}
                     relationshipOptions={props.friends.options.relationshipOptions}
                     tagsOptions={props.friends.options.tagsOptions}
                     onDone={props.onFriendsUpdate}
                     onClose={props.closeFriendsEdit}
                     showWeChatInput={!props.global.weChatId}
                     weChatId={props.global.weChatId}
                     onWeChatIdDone={props.onWeChatIdUpdate}
        />
        <RoommatesForm showForm={props.showRoommatesForm}
                       location={props.roommates.values.location}
                       hometown={props.roommates.values.hometown}
                       motto={props.roommates.values.motto}
                       tags={props.roommates.values.tags}
                       locationOptions={props.roommates.options.locationOptions}
                       hometownOptions={props.roommates.options.hometownOptions}
                       tagsOptions={props.roommates.options.tagsOptions}
                       onDone={props.onRoommatesUpdate}
                       onClose={props.closeRoommatesEdit}
                       showWeChatInput={!props.global.weChatId}
                       weChatId={props.global.weChatId}
                       onWeChatIdDone={props.onWeChatIdDone}
        />
        <PersonalForm showForm={props.showPersonalForm}
                      onDone={props.onPersonalUpdate}
                      onClose={props.closePersonalEdit}
                      personal={props.personal.values}
                      personalOptions={props.personal.options}
        />
    </div>
);

ProfileMain.propTypes = {
    // states
    classmates: PropTypes.shape({
        major: PropTypes.string,
        courses: PropTypes.arrayOf(PropTypes.string),
        motto: PropTypes.string,
        tags: PropTypes.arrayOf(PropTypes.string),
        majorOptions: PropTypes.arrayOf(PropTypes.string),
        coursesOptions: PropTypes.arrayOf(PropTypes.string),
        tagsOptions: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    roommates: PropTypes.shape({
        location: PropTypes.string,
        hometown: PropTypes.string,
        motto: PropTypes.string,
        tags: PropTypes.arrayOf(PropTypes.string),
        locationOptions: PropTypes.arrayOf(PropTypes.string),
        hometownOptions: PropTypes.arrayOf(PropTypes.string),
        tagsOptions: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    friends: PropTypes.shape({
        faculty: PropTypes.string,
        relationship: PropTypes.string,
        motto: PropTypes.string,
        tags: PropTypes.arrayOf(PropTypes.string),
        facultyOptions: PropTypes.arrayOf(PropTypes.string),
        relationshipOptions: PropTypes.arrayOf(PropTypes.string),
        tagsOptions: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    personal: PropTypes.object.isRequired, // from redux store
    global: PropTypes.object.isRequired,// from redux store
    // form open/close control
    showRoommatesForm: PropTypes.bool.isRequired,
    showFriendsForm: PropTypes.bool.isRequired,
    showClassmatesForm: PropTypes.bool.isRequired,
    showPersonalForm: PropTypes.bool.isRequired,
    // actions
    // open forms
    openClassmatesEdit: PropTypes.func.isRequired,
    openRoommatesEdit: PropTypes.func.isRequired,
    openFriendsEdit: PropTypes.func.isRequired,
    openPersonalEdit: PropTypes.func.isRequired,
    // close forms
    closeClassmatesEdit: PropTypes.func.isRequired,
    closeRoommatesEdit: PropTypes.func.isRequired,
    closeFriendsEdit: PropTypes.func.isRequired,
    closePersonalEdit: PropTypes.func.isRequired,
    // update forms
    onClassmatesUpdate: PropTypes.func.isRequired,
    onRoommatesUpdate: PropTypes.func.isRequired,
    onFriendsUpdate: PropTypes.func.isRequired,
    onPersonalUpdate: PropTypes.func.isRequired,
    // global state updates
    onWeChatIdDone: PropTypes.func.isRequired,
    onUsernameUpdate: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
    classmates: state.profile.classmates,
    roommates: state.profile.roommates,
    friends: state.profile.friends,
    personal: state.profile.personal,
    global: state.global,
    showRoommatesForm: state.profileUI.showRoommatesForm,
    showFriendsForm: state.profileUI.showFriendsForm,
    showClassmatesForm: state.profileUI.showClassmatesForm,
    showPersonalForm: state.profileUI.showPersonalForm
});

const mapDispatchToProps = (dispatch) => (
    bindActionCreators(
        {
            openClassmatesEdit: showClassMatesForm,
            openRoommatesEdit: showRoommatesForm,
            openFriendsEdit: showFriendsForm,
            openPersonalEdit: showPersonalForm,
            closeClassmatesEdit: hideClassmatesForm,
            closeRoommatesEdit: hideRoommatesForm,
            closeFriendsEdit: hideFriendsForm,
            closePersonalEdit: hidePersonalForm,
            onClassmatesUpdate: updateClassmatesValues,
            onRoommatesUpdate: updateRoommatesValues,
            onFriendsUpdate: updateFriendsValues,
            onPersonalUpdate: updatePersonalValues,
            onWeChatIdDone: updateWeChatId,
            onUsernameUpdate: updateUsername
        }, dispatch
    )
);

export default connect(mapStateToProps, mapDispatchToProps)(ProfileMain);