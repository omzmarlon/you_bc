'use strict';

import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { connect }  from 'react-redux'
import './Login.less'
import AuthTemplate from "../../components/authentication/AuthTemplate";
import TextField from "material-ui/TextField";
import { RaisedButton } from "material-ui";
import {PRIMARY_GREEN, PRIMARY_WHITE} from "../../styles/constants/colors";
import {REGISTER} from "../../constants/api";
import PokeEgg from "../../../public/images/poke_egg.png";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: "",
            checked: true
        };
        this.login = this.login.bind(this);
    }

    login() {
        alert("login!");
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
                            onChange={this.onCodeChange}
                            value={this.state.code}
                            fullWidth={true}
                        />
                        <TextField
                            id="password"
                            hintText="Password"
                            errorText={this.state.checked ? null : "邀请码不正确，请确认后重试"}
                            onChange={this.onCodeChange}
                            value={this.state.code}
                            fullWidth={true}
                        />
                    </div>
                    <RaisedButton
                        onClick={this.login}
                        backgroundColor={PRIMARY_GREEN}
                        fullWidth={true}
                        style={{marginBottom: 12}}
                        label="Sign in"
                        labelColor={PRIMARY_WHITE}
                        disabled={this.state.code === ""}
                    />
                    <Link to={REGISTER}>Create Account</Link>
                </div>
            </AuthTemplate>
        )
    }
}

export default Login;