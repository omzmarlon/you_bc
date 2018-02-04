'use strict';
// libs
import React, {Component} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
// styles
import "./HomePageContainer.less";
import {PRIMARY_BLUE, PRIMARY_RED, PRIMARY_YELLOW} from "../styles/constants/colors";
import {defaultIconSize} from "../styles/material/iconStyles";
// components
import Block from "../components/homePage/Block";
import FloatingActionButton from "material-ui/FloatingActionButton";
import Profile from "material-ui/svg-icons/action/account-circle";
// constants
import {TO_CLASSMATES, TO_FRIENDS, TO_PROFILE, TO_ROOMMATES} from "../constants/api";
import {
    fetchClassmatesInfo,
    fetchFriendsInfo,
    fetchMatchedUsers,
    fetchPersonalInfo,
    fetchRoommatesInfo
} from "../actions/profile/profileFetchActions";
import RollingEmoji from "../components/common/RollingEmoji";

class HomePageContainer extends Component {

    componentDidMount() {
        const { store } = this.context;
        // todo: call these so that users info are fetch(instead of waiting until going to profile page)
        // todo: but do we need a loading component?
        store.dispatch(fetchClassmatesInfo());
        store.dispatch(fetchFriendsInfo());
        store.dispatch(fetchRoommatesInfo());
        store.dispatch(fetchPersonalInfo());
        store.dispatch(fetchMatchedUsers());
    }

    render() {

        return(
            <div className="home-page">
                <Block className="classmate-block" path={TO_CLASSMATES} displayName="找 课 友" color={PRIMARY_RED}/>
                <Block className="friend-block" path={TO_FRIENDS} displayName={<RollingEmoji/>} color={PRIMARY_YELLOW}/>
                <Block className="roommate-block" path={TO_ROOMMATES} displayName="找 室 友" color={PRIMARY_BLUE}/>
                <Link to={TO_PROFILE}>
                    <FloatingActionButton className={'profile-button'}>
                        <Profile style={defaultIconSize} />
                        <span className={'to-profile-label'}>个人主页</span>
                    </FloatingActionButton>
                </Link>
            </div>
        )
    }
}

HomePageContainer.contextTypes = {
    store: PropTypes.object
};

export default HomePageContainer;