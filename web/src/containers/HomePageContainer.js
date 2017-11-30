'use strict';
// libs
import React, {Component} from 'react'
// styles
import './HomePageContainer.less';
// components
import Block from "../components/homePage/Block";
// constants
import {CLASSMATES, FRIENDS, ROOMMATES} from "../constants/api";

class HomePageContainer extends Component {
    render() {
        return(
            <div className="index-page-main">
                <Block path={CLASSMATES} displayName="找课友" type="classmates"/>
                <Block path={FRIENDS} displayName="找——友" type="friends"/>
                <Block path={ROOMMATES} displayName="找室友" type="roommates"/>
            </div>
        )
    }
}

export default HomePageContainer;