'use strict';

import React from 'react';
import './PrepareApplicationContainer.less';
import { connect }  from 'react-redux';
import {bindActionCreators} from "redux";
import AuthStatus from "../utils/AuthStatus";
import {fetchAuthStatus} from "../actions/global/authenticationActions";
import {LOGIN} from "../constants/api";
import { Redirect } from 'react-router-dom';
import CircularProgress from 'material-ui/CircularProgress';
import AuthTemplate from "../components/authentication/AuthTemplate";
import {getAuthToken} from "../utils/AuthService";
import {fetchVerificationStatus, updateVerificationStatus} from "../actions/global/verificationActions";
import {hideGlobalSpinner, showGlobalSpinner, showInfoBar} from "../actions/global/globalActions";
import {submitVerificationCode} from "../requests/verificationRequests";
import VerificationComponent from "./verification/VerificationComponent";
import VerificationStatus from "../utils/VerificationStatus";

/**
 * This component acts as a middleware between user and protected pages.
 * This component will perform necessary operations to setup required states to load protected pages. ie. authentication & verification
 * When all required states are
 */

// TODO: refactor application preparatio into a pipeline model
class PrepareApplicationContainer extends React.Component{

    handleCodeSubmit(code) {
        let {dispatch} = this.props;

        dispatch(showGlobalSpinner());
        submitVerificationCode(code)
            .then(response => {
                dispatch(hideGlobalSpinner());
                dispatch(updateVerificationStatus(VerificationStatus.VERIFICATION_SUCCESS));
                dispatch(showInfoBar("Verification Success!"));
            }, error => {
                // TODO centrolize error handling
                dispatch(hideGlobalSpinner());
                console.log(error);
                dispatch(showInfoBar("Oops... That code didn't work"));
            })
            .catch(error => {
                // TODO centrolize error handling
                dispatch(hideGlobalSpinner());
                console.log(error);
                dispatch(showInfoBar("Oops... That code didn't work"));
            });
    }

    render() {
        let {dispatch} = this.props;
        const { from } = this.props.location.state || { from: { pathname: "/" } };

        if (!getAuthToken() || this.props.authStatus === AuthStatus.UNAUTHORIZED) {
            // No token exists or confirmed unauthorized status, redirect go to login page
            return (
                <Redirect
                    to={{
                        pathname: LOGIN,
                        state: { from }
                    }}
                />
            );
        } else if (this.props.authStatus === AuthStatus.UNKNOWN ||
            this.props.verification.verificationStatus === VerificationStatus.UNKNOWN) {
            // updating auth status, show loading page
            dispatch(fetchAuthStatus());
            dispatch(fetchVerificationStatus());
            return (
                <AuthTemplate header={'Welcome Back'}>
                    <div className={'prepare-auth'}>
                        <p className={'prepare-auth-title'}>Securely logging you in...</p>
                        <CircularProgress size={100} thickness={7}/>
                    </div>
                </AuthTemplate>
            );
        } else if(this.props.authStatus === AuthStatus.AUTH_SUCCESS) {
            // application is already authenticated.
            if (this.props.verification.verificationStatus === VerificationStatus.VERIFICATION_SUCCESS) {
                return (
                    <Redirect to={"/"}/>
                );
            } else {
                return <VerificationComponent username={this.props.authDetail.username} onCodeSubmit={this.handleCodeSubmit.bind(this)}/>;
            }
        } else {
            return (
                <div>
                    Something went wrong
                </div>
            );
        }
    }
}

const mapStateToProps = state => ({
    authStatus: state.authentication.authStatusCode,
    authDetail: state.authentication.authDetail,
    verification: state.verification
});

export default connect(mapStateToProps)(PrepareApplicationContainer);