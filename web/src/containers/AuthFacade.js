'use strict';

import React, {Component} from 'react';
import { connect }  from 'react-redux'

import {fetchAuthToken} from "../actions/global/authenticationActions";
import HomePageContainer from "./HomePageContainer";
import {Redirect} from "react-router-dom";
import {TO_EMAIL_CHECK, TO_LOCATION_CHECK, TO_STUDENT_CARD_CHECK} from "../constants/api";
import AuthPage from "../components/errorPage/AuthPage";


class AuthFacade extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
    }

    login() {
        let { dispatch } = this.props;
        let queryStr = this.props.location.search;
        let code = queryStr.substring(queryStr.indexOf('='));
        dispatch(fetchAuthToken(code));
    }

    componentDidMount() {
        this.login();
    }

    render() {
        const { isAuthenticated, isVerified, pending } = this.props;
        if (isAuthenticated) {
            if (isVerified) {
                return <HomePageContainer/>;
            } else {
                switch (pending) {
                    case 'email':
                        return <Redirect to={TO_EMAIL_CHECK} />;
                    case 'card':
                        return <Redirect to={TO_STUDENT_CARD_CHECK} />;
                    case 'none':
                    default:
                        return <Redirect to={TO_LOCATION_CHECK} />;
                }
            }
        } else {
            return <AuthPage/>;
        }
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.global.authStatusCode === 200,
    isVerified: state.verification.isLocationVerified || state.verification.isEmailVerified || state.verification.isStudentCardVerified,
    pending: state.verification.pending
});

export default connect(mapStateToProps)(AuthFacade);