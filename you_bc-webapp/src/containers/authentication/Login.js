'use strict';

import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import { connect }  from 'react-redux'
import './Login.less'
import AuthTemplate from "../../components/authentication/AuthTemplate";
import TextField from "material-ui/TextField";
import {RaisedButton} from "material-ui";
import {PRIMARY_GREEN, PRIMARY_WHITE, FACEBOOK} from "../../styles/constants/colors";
import {REGISTER} from "../../constants/api";
import PokeEgg from "../../../public/images/poke_egg.png";
import FacebookIcon from "../../components/common/svg/Facebook";
import {loginPostRequest, loginRequest, loginComplete} from "../../actions/global/authenticationActions";
import AuthStatus from '../../utils/AuthStatus';
import {hideGlobalSpinner, showGlobalSpinner, showInfoBar} from "../../actions/global/globalActions";
import LocalStorage from "../../utils/LocalStorage";
import {saveAuthToken} from "../../utils/AuthService";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            signInClicked: false,
            errorText: ''
        };
        this.login = this.login.bind(this);
        this.facebookAuth = this.facebookAuth.bind(this);
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
    }

    login() {
        let {dispatch} = this.props;

        dispatch(showGlobalSpinner());
        dispatch(loginRequest());
        loginPostRequest(this.state.username, this.state.password)
            .then(
                response => {
                    dispatch(hideGlobalSpinner());
                    if (response.data.token) {
                        const jwtToken = response.data.token;
                        saveAuthToken(jwtToken);
                        dispatch(showInfoBar("Login Success!"));
                        dispatch(loginComplete(200, 'OK'));
                    } else {
                        dispatch(showInfoBar("Could Not Get Authentication Token"));
                    }
                },
                error => {
                    // todo centralize error handling
                    console.log(error.response.data.message); // todo centralize logging
                    dispatch(hideGlobalSpinner());
                    dispatch(loginComplete(401, error.response.data.message));
                    dispatch(showInfoBar('Login failed'));
                    this.setState({errorText: 'Invalid username or password'});
                }
            )
            .catch(
                error => {
                    // todo centralize error handling
                    // todo remove console log
                    console.log(error);
                    dispatch(hideGlobalSpinner());
                    dispatch(showInfoBar('Login failed'));
                }
            );

        this.setState({signInClicked: true, password: ""});
    }

    facebookAuth() {
        // todo: facebook oauth coming later
    }

    onUsernameChange(e, val) {
        this.setState({username: val, errorText: ''});
    }

    onPasswordChange(e, val) {
        this.setState({password: val, errorText: ''});
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: "/" } };
        if (this.props.isAuthenticated) {
            return <Redirect to={from}/>;
        } else {
            return (
                <AuthTemplate header="Welcome Back!">
                    <div className="login-page-container">
                        <img src={PokeEgg} className="egg-icon"/>
                        <div className="code-input">
                            <TextField
                                id="username"
                                hintText="Username"
                                errorText={this.state.errorText}
                                onChange={this.onUsernameChange}
                                value={this.state.username}
                                fullWidth={true}
                            />
                            <TextField
                                id="password"
                                hintText="Password"
                                errorText={this.state.errorText}
                                onChange={this.onPasswordChange}
                                value={this.state.password}
                                fullWidth={true}
                                type="password"
                            />
                        </div>
                        <RaisedButton
                            onClick={this.login}
                            backgroundColor={PRIMARY_GREEN}
                            fullWidth={true}
                            style={{marginBottom: 12}}
                            label="Sign in"
                            labelColor={PRIMARY_WHITE}
                            disabled={this.state.username === "" || this.state.password === ""}
                        />
                        {/*<RaisedButton*/}
                            {/*onClick={this.facebookAuth}*/}
                            {/*backgroundColor={FACEBOOK}*/}
                            {/*fullWidth={true}*/}
                            {/*style={{marginBottom: 12}}*/}
                            {/*label="Use Facebook account"*/}
                            {/*labelColor={PRIMARY_WHITE}*/}
                            {/*labelStyle={{paddingLeft: 20, fontWeight: 100, fontSize: '3vw'}}*/}
                            {/*icon={<FacebookIcon/>}*/}
                        {/*/>*/}
                        <Link to={REGISTER} className="register-link">Create Account</Link>
                    </div>
                </AuthTemplate>
            )
        }
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.authentication.authStatusCode === AuthStatus.AUTH_SUCCESS,
});

export default connect(mapStateToProps)(Login);