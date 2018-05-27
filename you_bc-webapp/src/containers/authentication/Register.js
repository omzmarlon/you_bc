'use strict';

import React, {Component} from 'react'
import { connect }  from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import './Register.less'
import AuthTemplate from "../../components/authentication/AuthTemplate";
import TextField from "material-ui/TextField";
import {RaisedButton} from "material-ui";
import {LOGIN, PRE_APP} from "../../constants/api";
import {PRIMARY_GREEN, PRIMARY_WHITE } from "../../styles/constants/colors";
import PokeEgg from "../../../public/images/poke_egg.png";
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import {updateAuthStatusCode} from "../../actions/global/authenticationActions";
import AuthStatus from '../../utils/AuthStatus';
import {hideGlobalSpinner, showGlobalSpinner, showInfoBar} from "../../actions/global/globalActions";
import LocalStorage from "../../utils/LocalStorage";
import {saveAuthToken} from "../../utils/AuthService";
import {postLoginRequest, postRegisterRequest} from "../../requests/authenticationRequests";
import {defaultErrorHandler} from "../../utils/ErrorHandling";

const spinnerStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
};

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            confirmPassword: "",
            gender: 0,
            signUpClicked: false,
            passwordChanged: false,
            confirmChanged: false,
            usernameErrorText: ''
        };
        this.register = this.register.bind(this);
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onGenderChange = this.onGenderChange.bind(this);
        this.onConfirmPasswordChange = this.onConfirmPasswordChange.bind(this);
    }

    register() {
        let {dispatch} = this.props;
        dispatch(showGlobalSpinner());
        postRegisterRequest(this.state.username, this.state.password, this.state.gender)
            .then(
                response => {
                    this.loginOnRegisterSuccess();
                },
                error => {
                    defaultErrorHandler(error, dispatch, "Register Failed", [hideGlobalSpinner()]);
                    this.setState({usernameErrorText: "User already exists"});
                }
            );
    }

    loginOnRegisterSuccess() {
        let {dispatch} = this.props;
        postLoginRequest(this.state.username, this.state.password)
            .then(
                response => {
                    dispatch(hideGlobalSpinner());
                    if (response.data.token) {
                        const jwtToken = response.data.token;
                        saveAuthToken(jwtToken);
                        dispatch(showInfoBar("Login Success!"));
                        dispatch(updateAuthStatusCode(AuthStatus.AUTH_SUCCESS));
                    } else {
                        dispatch(showInfoBar("Could Not Get Authentication Token"));
                    }
                },
                error => {

                    defaultErrorHandler(
                        error,
                        dispatch,
                        "Registration successful, but login failed",
                        [
                            hideGlobalSpinner(),
                            updateAuthStatusCode(AuthStatus.UNAUTHORIZED)
                        ]
                    )
                }
            );
    }

    onUsernameChange(e, val) {
        this.setState({username: val, usernameErrorText: ''});
    }

    onPasswordChange(e, val) {
        this.setState({password: val, passwordChanged: true});
    }

    onGenderChange(e, val) {
        this.setState({gender: val});
    }

    onConfirmPasswordChange(e, val) {
        this.setState({confirmPassword: val, confirmChanged: true});
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: "/" } };
        if (this.props.registerSuccess) {
            return <Redirect to={{
                pathname: PRE_APP,
                state: { from }
            }}/>;
        } else {
            return (
                <AuthTemplate header="Welcome!">
                    <div className="register-page-container">
                        <img src={PokeEgg} className="egg-icon"/>
                        <RadioButtonGroup
                            className="gender-radio-btn"
                            name="gender"
                            defaultSelected="not_light"
                            onChange={this.onGenderChange}
                        >
                            <RadioButton value={1} label="Male" iconStyle={{marginRight: 5}} />
                            <RadioButton value={2} label="Female" iconStyle={{marginRight: 5}} />
                        </RadioButtonGroup>
                        <div className="code-input">
                            <TextField
                                id="username"
                                hintText="Username"
                                errorText={this.state.usernameErrorText}
                                onChange={this.onUsernameChange}
                                value={this.state.username}
                                fullWidth={true}
                            />
                            <TextField
                                id="password"
                                hintText="Password"
                                errorText={this.state.password.length > 5 || !this.state.passwordChanged ? null : "too short! at least 6 characters"}
                                onChange={this.onPasswordChange}
                                value={this.state.password}
                                fullWidth={true}
                                type="password"
                            />
                            <TextField
                                id="password2"
                                hintText="Confirm Password"
                                errorText={this.state.password === this.state.confirmPassword || !this.state.confirmChanged ?
                                    null :
                                    "doesn't match"}
                                onChange={this.onConfirmPasswordChange}
                                value={this.state.confirmPassword}
                                fullWidth={true}
                                type="password"
                            />
                        </div>
                        <RaisedButton
                            onClick={this.register}
                            backgroundColor={PRIMARY_GREEN}
                            fullWidth={true}
                            style={{marginBottom: 12}}
                            label="Sign up"
                            labelColor={PRIMARY_WHITE}
                            disabled={this.state.password !== this.state.confirmPassword ||
                            this.state.password === "" ||
                            this.state.username === "" ||
                            this.state.gender === 0}
                        />
                        <Link to={LOGIN} className="register-link">Back to sign in</Link>
                    </div>
                </AuthTemplate>
            )
        }
    }
}

const mapStateToProps = state => ({
    registerSuccess: state.authentication.authStatusCode === AuthStatus.AUTH_SUCCESS,
});

export default connect(mapStateToProps)(Register);