'use strict';

import React, {Component} from 'react';
import { connect }  from 'react-redux'
const queryStringParser = require('query-string');

import {fetchAuthToken, fetchAuthTokenComplete} from "../actions/global/authenticationActions";
import HomePageContainer from "./HomePageContainer";
import AuthPage from "../components/errorPage/AuthPage";
import EmailCheckContainer from "./verification/EmailCheckContainer";
import StudentCardCheckContainer from "./verification/StudentCardCheckContainer";
import LocationCheckContainer from "./verification/LocationCheckContainer";


class AuthFacade extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
    }

    login() {
        let { dispatch } = this.props;
        let queryStr = queryStringParser.parse(this.props.location.search);
        let code = queryStr["auth"];
        if (code === 'fail' || !code) {
            dispatch(fetchAuthTokenComplete(401, queryStr["message"]))
        } else {
            dispatch(fetchAuthToken(code));
        }
    }

    componentDidMount() {
        this.login();
    }

    render() {
        const { isAuthenticated, isVerified, pending, using } = this.props;
        if (isAuthenticated) {
            if (isVerified) {
                return <HomePageContainer/>;
            } else {
                if (pending !== 'none') {
                    switch (pending) {
                        case 'email':
                            return <EmailCheckContainer/>;
                        case 'card':
                            return <StudentCardCheckContainer/>;
                        case 'none':
                        default:
                            return <LocationCheckContainer/>;
                    }
                } else {
                    switch (using) {
                        case 'email':
                            return <EmailCheckContainer/>;
                        case 'card':
                            return <StudentCardCheckContainer/>;
                        default:
                            return <LocationCheckContainer/>;
                    }
                }
            }
        } else {
            return <AuthPage/>;
        }
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.authentication.authStatusCode === 200,
    isVerified: state.verification.isLocationVerified || state.verification.isEmailVerified || state.verification.isStudentCardVerified,
    pending: state.verification.pending,
    using: state.verification.using
});

export default connect(mapStateToProps)(AuthFacade);