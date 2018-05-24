'use strict';

import React, {Component} from 'react';
import { connect }  from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import {PRE_APP} from '../../constants/api';
import AuthStatus from '../../utils/AuthStatus';
import VerificationStatus from "../../utils/VerificationStatus";

const PrivateRoute = ({ component: Component, authStatus, verification, ...restProps }) => (
    <Route
        {...restProps}
        render={routerProps => {
            return authStatus === AuthStatus.AUTH_SUCCESS && verification.verificationStatus === VerificationStatus.VERIFICATION_SUCCESS? (
                <Component {...routerProps} />
            ) : (
                <Redirect
                    to={{
                        pathname: PRE_APP,
                        state: { from: routerProps.location }
                    }}
                />
            )
        }}
    />
);

const mapStateToProps = state => ({
    authStatus: state.authentication.authStatusCode,
    verification: state.verification
});

export default connect(mapStateToProps)(PrivateRoute);