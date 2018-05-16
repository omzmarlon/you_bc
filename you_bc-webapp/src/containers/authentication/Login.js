'use strict';

import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { connect }  from 'react-redux'
import './Login.less'
import AuthTemplate from "../../components/authentication/AuthTemplate";
import TextField from "material-ui/TextField";
import {CircularProgress, RaisedButton} from "material-ui";
import {PRIMARY_GREEN, PRIMARY_WHITE, FACEBOOK} from "../../styles/constants/colors";
import {REGISTER} from "../../constants/api";
import PokeEgg from "../../../public/images/poke_egg.png";
import FacebookIcon from "../../components/common/svg/Facebook";
import {loginAction} from "../../actions/global/authenticationActions";

const spinnerStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
};

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            signInClicked: false
        };
        this.login = this.login.bind(this);
        this.facebookAuth = this.facebookAuth.bind(this);
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
    }

    login() {
        let {dispatch} = this.props;
        dispatch(loginAction(this.state.username, this.state.password));
        this.setState({signInClicked: true, password: ""});
    }

    facebookAuth() {
        // todo: facebook oauth coming later
    }

    onUsernameChange(e, val) {
        this.setState({username: val});
    }

    onPasswordChange(e, val) {
        this.setState({password: val});
    }

    render() {
        return (
            <AuthTemplate header="Welcome Back!">
                {
                    this.props.isAuthenticating ? <CircularProgress style={spinnerStyle}/> : null
                }
                <div className="login-page-container">
                    <img src={PokeEgg} className="egg-icon"/>
                    <div className="code-input">
                        <TextField
                            id="username"
                            hintText="Username"
                            errorText={this.props.isAuthenticated || !this.state.signInClicked ? null : "Invalid username or password"}
                            onChange={this.onUsernameChange}
                            value={this.state.username}
                            fullWidth={true}
                        />
                        <TextField
                            id="password"
                            hintText="Password"
                            errorText={this.props.isAuthenticated || !this.state.signInClicked ? null : "Invalid username or password"}
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
                    <RaisedButton
                        onClick={this.facebookAuth}
                        backgroundColor={FACEBOOK}
                        fullWidth={true}
                        style={{marginBottom: 12}}
                        label="Use Facebook account"
                        labelColor={PRIMARY_WHITE}
                        labelStyle={{paddingLeft: 20, fontWeight: 100, fontSize: '3vw'}}
                        icon={<FacebookIcon/>}
                    />
                    <Link to={REGISTER} className="register-link">Create Account</Link>
                </div>
            </AuthTemplate>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.authentication.authStatusCode === 200,
    isAuthenticating: state.authentication.isAuthenticating
});

export default connect(mapStateToProps)(Login);