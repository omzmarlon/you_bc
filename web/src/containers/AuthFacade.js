'use strict';

import React, {Component} from 'react';
import { connect }  from 'react-redux'

import {fetchAuthToken} from "../actions/global/authenticationActions";
import HomePageContainer from "./HomePageContainer";
import AuthPage from "../components/errorPage/AuthPage";
import EmailCheckContainer from "./verification/EmailCheckContainer";
import StudentCardCheckContainer from "./verification/StudentCardCheckContainer";
import LocationCheckContainer from "./verification/LocationCheckContainer";
import TestCodePage from "../components/errorPage/TestCodePage";


class AuthFacade extends Component {
    constructor(props) {
        super(props);
        this.state = {
            testCode: ''
        };
        this.login = this.login.bind(this);
        this.onEnterTestCode = this.onEnterTestCode.bind(this);
    }

    onEnterTestCode(event, newValue) {
        this.setState({testCode: newValue});
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
        const { isAuthenticated, isVerified, pending, using } = this.props;
        if (this.state.testCode === 'pokedemo') {
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
        } else {
            return <TestCodePage onChange={this.onEnterTestCode}/>;
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