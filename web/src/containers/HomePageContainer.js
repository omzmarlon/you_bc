'use strict';
// libs
import React, {Component} from 'react'
// styles
import './HomePageContainer.less';
// components
import Block from "../components/homePage/Block";
// constants
import {TO_CLASSMATES, TO_FRIENDS, TO_ROOMMATES, CLASSMATES, FRIENDS, ROOMMATES} from "../constants/api";

class HomePageContainer extends Component {
    render() {
        return(
            <div className="index-page-main">
                <Block path={TO_CLASSMATES} displayName="找课友" type={CLASSMATES}/>
                <Block path={TO_FRIENDS} displayName="找——友" type={FRIENDS}/>
                <Block path={TO_ROOMMATES} displayName="找室友" type={ROOMMATES}/>
            </div>
        )
    }
}

export default HomePageContainer;