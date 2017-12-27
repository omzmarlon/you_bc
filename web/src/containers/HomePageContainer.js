'use strict';
// libs
import React, {Component} from 'react'
import { Link } from "react-router-dom";
// styles
import './HomePageContainer.less';
import {PRIMARY_BLUE, PRIMARY_RED, PRIMARY_WHITE, PRIMARY_YELLOW} from "../styles/constants/colors";
import {defaultIconSize} from '../styles/material/iconStyles';
// components
import Block from "../components/homePage/Block";
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Profile from 'material-ui/svg-icons/action/account-circle';
import Rollable from '../components/common/Rollable';
//assets
// TODO: change svg icons
import MacIcon from 'material-ui/svg-icons/hardware/desktop-mac'
import WindowIcon from 'material-ui/svg-icons/hardware/desktop-windows'
import DockIcon from 'material-ui/svg-icons/hardware/dock'
import SecurityIcon from 'material-ui/svg-icons/hardware/security'
import PhoneIcon from 'material-ui/svg-icons/hardware/smartphone'
import AndroidIcon from 'material-ui/svg-icons/hardware/phone-android'
// constants
import {TO_CLASSMATES, TO_FRIENDS, TO_ROOMMATES, TO_PROFILE} from "../constants/api";

const rollingIconStyle = {
    color: PRIMARY_WHITE,
    width: 36,
    height: 36
};

class HomePageContainer extends Component {
    render() {

        const friendDisplayName = (
            <div className="friend-display-name">
                <span>找</span>
                <Rollable
                    rollingInterval={2500}
                    rollingItems={
                        [
                            <MacIcon style={rollingIconStyle} />,
                            <DockIcon style={rollingIconStyle} />,
                            <SecurityIcon style={rollingIconStyle} />,
                            <WindowIcon style={rollingIconStyle} />,
                            <PhoneIcon style={rollingIconStyle} />,
                            <AndroidIcon style={rollingIconStyle} />
                        ]
                    }
                />
                <span>友</span>
            </div>
        );

        return(
            <div className="home-page">
                <Block path={TO_CLASSMATES} displayName="找 课 友" color={PRIMARY_RED}/>
                <Block path={TO_FRIENDS} displayName={friendDisplayName} color={PRIMARY_YELLOW}/>
                <Block path={TO_ROOMMATES} displayName="找 室 友" color={PRIMARY_BLUE}/>
                <Link to={'/demo'}>
                    <FloatingActionButton className={'demo-button'}>
                        <span style={{fontSize: 14, lineHeight: '18px'}}>Demo</span>
                    </FloatingActionButton>
                </Link>
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

export default HomePageContainer;