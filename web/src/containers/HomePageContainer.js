'use strict';
// libs
import React, {Component} from 'react'
import { Link } from "react-router-dom";
// styles
import './HomePageContainer.less';
import {PRIMARY_BLUE, PRIMARY_RED, PRIMARY_YELLOW} from "../styles/constants/colors";
import {defaultIconSize} from '../styles/material/iconStyles';
// components
import Block from "../components/homePage/Block";
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Profile from 'material-ui/svg-icons/action/account-circle';
// constants
import {TO_CLASSMATES, TO_FRIENDS, TO_ROOMMATES, TO_PROFILE} from "../constants/api";

class HomePageContainer extends Component {
    render() {
        return(
            <div className="home-page">
                <Block path={TO_CLASSMATES} displayName="找 课 友" color={PRIMARY_BLUE}/>
                <Block path={TO_FRIENDS} displayName="找——友" color={PRIMARY_YELLOW}/>
                <Block path={TO_ROOMMATES} displayName="找 室 友" color={PRIMARY_RED}/>
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