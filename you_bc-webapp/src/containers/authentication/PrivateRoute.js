'use strict';

import React, {Component} from 'react';
import { connect }  from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import {PRE_LOGIN} from '../../constants/api';
import AuthStatus from '../../utils/AuthStatus';

const PrivateRoute = ({ component: Component, authStatus, ...restProps }) => (
    <Route
        {...restProps}
        render={routerProps => {
            return authStatus === AuthStatus.AUTH_SUCCESS? (
                <Component {...routerProps} />
            ) : (
                <Redirect
                    to={{
                        pathname: PRE_LOGIN,
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

export default connect(mapStateToProps)(PrivateRoute);