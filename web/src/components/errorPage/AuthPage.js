import React, {Component} from 'react';
import { connect }  from 'react-redux'
import './AuthPage.less';

const AuthPage = (props) => {
    if (props.isAuthenticating) {
        return (
            <div className="auth-page-container">
                <p>登录中。。。</p>
            </div>
        );
    } else {
        return (
            <div className="auth-page-container">
                <p>{props.errorMessage}</p>
            </div>
        );
    }
};

const mapStateToProps = (state) => ({
    isAuthenticating: state.authentication.isAuthenticating,
    statusCode: state.authentication.authStatusCode,
    errorMessage: state.authentication.authMessage
});

export default connect(mapStateToProps)(AuthPage);