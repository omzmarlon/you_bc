'use strict';

import React, {Component} from 'react';
import { connect }  from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { LOGIN } from '../../constants/api';

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
    isAuthenticated: state.authentication.authStatusCode === 200
});

export default connect(mapStateToProps)(PrivateRoute);