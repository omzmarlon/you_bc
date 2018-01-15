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
        return (
            <div className="auth-page-error-container">
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