'use strict';
// libs
import React, {Component} from 'react'
import { Link } from "react-router-dom";
// styles
import './HomePageContainer.less';
import {PRIMARY_BLUE, PRIMARY_RED, PRIMARY_YELLOW} from "../styles/constants/colors";
// components
import Block from "../components/homePage/Block";
import FloatingActionButton from 'material-ui/FloatingActionButton';
// constants
import {CLASSMATES, FRIENDS, ROOMMATES} from "../constants/api";

class HomePageContainer extends Component {
    render() {
        return(
            <div className="home-page">
                <Block path={CLASSMATES} displayName="找课友" color={PRIMARY_BLUE}/>
                <Block path={FRIENDS} displayName="找——友" color={PRIMARY_YELLOW}/>
                <Block path={ROOMMATES} displayName="找室友" color={PRIMARY_RED}/>
                <Link to={'/demo'}>
                    <FloatingActionButton className={'profile-button'}>
                        <span style={{fontSize: 35}}>See Demo</span>
                    </FloatingActionButton>
                </Link>
            </div>
        )
    }
}

export default HomePageContainer;