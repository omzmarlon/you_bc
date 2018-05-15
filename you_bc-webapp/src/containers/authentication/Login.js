'use strict';

import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { connect }  from 'react-redux'
import './Login.less'
import AuthTemplate from "../../components/authentication/AuthTemplate";
import TextField from "material-ui/TextField";
import { RaisedButton } from "material-ui";
import {PRIMARY_GREEN, PRIMARY_WHITE, FACEBOOK} from "../../styles/constants/colors";
import {REGISTER} from "../../constants/api";
import PokeEgg from "../../../public/images/poke_egg.png";
import FacebookIcon from "../../components/common/svg/Facebook";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            checked: true
        };
        this.login = this.login.bind(this);
        this.facebookAuth = this.facebookAuth.bind(this);
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
    }

    login() {

    }

    facebookAuth() {

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
                <div className="login-page-container">
                    <img src={PokeEgg} className="egg-icon"/>
                    <div className="code-input">
                        <TextField
                            id="username"
                            hintText="Username"
                            errorText={this.state.checked ? null : "邀请码不正确，请确认后重试"}
                            onChange={this.onUsernameChange}
                            value={this.state.username}
                            fullWidth={true}
                        />
                        <TextField
                            id="password"
                            hintText="Password"
                            errorText={this.state.checked ? null : "邀请码不正确，请确认后重试"}
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

export default Login;