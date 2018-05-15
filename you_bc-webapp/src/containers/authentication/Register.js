'use strict';

import React, {Component} from 'react'
import { connect }  from 'react-redux'
import { Link } from 'react-router-dom'
import './Register.less'
import AuthTemplate from "../../components/authentication/AuthTemplate";
import TextField from "material-ui/TextField";
import { RaisedButton } from "material-ui";
import {LOGIN} from "../../constants/api";
import {PRIMARY_GREEN, PRIMARY_WHITE } from "../../styles/constants/colors";
import PokeEgg from "../../../public/images/poke_egg.png";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            confirmPassword: "",
            checked: true
        };
        this.register = this.register.bind(this);
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onConfirmPasswordChange = this.onConfirmPasswordChange.bind(this);
    }

    register() {

    }

    onUsernameChange(e, val) {
        this.setState({username: val});
    }

    onPasswordChange(e, val) {
        this.setState({password: val});
    }

    onConfirmPasswordChange(e, val) {
        this.setState({confirmPassword: val});
    }

    render() {
        return (
            <AuthTemplate header="Welcome!">
                <div className="register-page-container">
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
                        <TextField
                            id="password2"
                            hintText="Confirm Password"
                            errorText={this.state.password === this.state.confirmPassword ?
                                null :
                                "doesn't match!"}
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
                        this.state.username === ""}
                    />
                    <Link to={LOGIN} className="register-link">Back to sign in</Link>
                </div>
            </AuthTemplate>
        )
    }
}

export default Register;