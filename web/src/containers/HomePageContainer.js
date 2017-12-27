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
import Rollable from '../components/common/Rollable';
// constants
import {TO_CLASSMATES, TO_FRIENDS, TO_ROOMMATES, TO_PROFILE} from "../constants/api";

class HomePageContainer extends Component {
    render() {

        const friendDisplayName = (
            <div className="friend-display-name">
                <span>找</span>
                <Rollable
                    width={150}
                    height={150}
                    rollingInterval={2500}
                    rollingItems={
                        [
                            <div style={{backgroundImage: `url('https://d3rnbxvnd0hlox.cloudfront.net/images/channels/72/icons/large.png')`, minWidth: 150, minHeight: 150, backgroundSize: 'contain'}}> </div>,
                            <div style={{backgroundImage: `url('https://d3rnbxvnd0hlox.cloudfront.net/images/channels/36/icons/large.png')`, minWidth: 150, minHeight: 150, backgroundSize: 'contain'}}> </div>,
                            <div style={{backgroundImage: `url('https://d3rnbxvnd0hlox.cloudfront.net/images/channels/24/icons/large.png')`, minWidth: 150, minHeight: 150, backgroundSize: 'contain'}}> </div>,
                            <div style={{backgroundImage: `url('https://d3rnbxvnd0hlox.cloudfront.net/images/channels/21/icons/large.png')`, minWidth: 150, minHeight: 150, backgroundSize: 'contain'}}> </div>,
                            <div style={{backgroundImage: `url('https://d3rnbxvnd0hlox.cloudfront.net/images/channels/33/icons/large.png')`, minWidth: 150, minHeight: 150, backgroundSize: 'contain'}}> </div>,
                            <div style={{backgroundImage: `url('https://d3rnbxvnd0hlox.cloudfront.net/images/channels/10/icons/large.png')`, minWidth: 150, minHeight: 150, backgroundSize: 'contain'}}> </div>,
                            <div style={{backgroundImage: `url('https://d3rnbxvnd0hlox.cloudfront.net/images/channels/1515512761/icons/large.png')`, minWidth: 150, minHeight: 150, backgroundSize: 'contain'}}> </div>
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