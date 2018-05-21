'use strict';

import React, {Component} from 'react';
import { connect }  from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { LOGIN } from '../../constants/api';
import AuthStatus from '../../utils/AuthStatus';
import {fetchAuthStatus} from "../../actions/global/authenticationActions";
import {bindActionCreators} from "redux";

const PrivateRoute = ({ component: Component, authStatus, fetchAuthStatus, ...restProps }) => (
    <Route
        {...restProps}
        render={routerProps => {
            fetchAuthStatus();

            return authStatus === AuthStatus.AUTH_SUCCESS? (
                <Component {...routerProps} />
            ) : (
                <Redirect
                    to={{
                        pathname: LOGIN,
                        state: { from: routerProps.location }
                    }}
                />
            )
        }}
    />
);

const mapStateToProps = state => ({
    authStatus: state.authentication.authStatusCode
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        fetchAuthStatus
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);