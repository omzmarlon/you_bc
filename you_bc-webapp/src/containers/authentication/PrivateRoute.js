'use strict';

import React, {Component} from 'react';
import { connect }  from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { LOGIN } from '../../constants/api';
import AuthStatus from '../../utils/AuthStatus';

const PrivateRoute = ({ component: Component, isAuthenticated,  ...restProps }) => (
    <Route
        {...restProps}
        render={routerProps =>
            isAuthenticated? (
                <Component {...routerProps} />
            ) : (
                <Redirect
                    to={{
                        pathname: LOGIN,
                        state: { from: routerProps.location }
                    }}
                />
            )
        }
    />
);

const mapStateToProps = state => ({
    isAuthenticated: state.authentication.authStatusCode === AuthStatus.AUTH_SUCCESS
});

export default connect(mapStateToProps)(PrivateRoute);