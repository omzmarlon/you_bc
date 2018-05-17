/**
 * todo: no longer in use
 */

import React, {Component} from 'react';
import { connect }  from 'react-redux'
import './AuthPage.less';
import Logo from '../../../public/images/youbc-logo.png';

const AuthPage = (props) => {
    if (props.isAuthenticating) {
        return (
            <div className="auth-page-loading-container">
                <img src={Logo} style={{width: '30vw', height: 'auto'}}/>
                <p>登录中。。。</p>
            </div>
        );
    } else {
        // when you get to here, there must be an error in authentication
        if (process.env.NODE_ENV === 'production') {
            return (
                <div className="auth-page-error-container">
                    <div className="error-page-title">
                        <img src={Logo} style={{width: '30vw', height: 'auto'}}/>
                        <span>ops...</span>
                    </div>
                    <p>微信登录失败，请稍后重试</p>
                </div>
            );
        } else {
            return (
                <div className="auth-page-dev-container">
                    <h1>{props.statusCode}</h1>
                    <p>{props.errorMessage}</p>
                </div>
            );
        }
    }
};

const mapStateToProps = (state) => ({
    isAuthenticating: state.authentication.isAuthenticating,
    statusCode: state.authentication.authStatusCode,
    errorMessage: state.authentication.authMessage
});

export default connect(mapStateToProps)(AuthPage);