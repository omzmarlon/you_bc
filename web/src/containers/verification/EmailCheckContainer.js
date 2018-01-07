'use strict';

import React, {Component} from 'react';
import VerificationTemplate from "../../components/verification/VerificationTemplate";
import './EmailCheckContainer.less';
import {RaisedButton, TextField} from "material-ui";
import {PRIMARY_GREEN, PRIMARY_WHITE} from "../../styles/constants/colors";
import EmailImg from "../../components/common/svg/EmailImg";

const inputStyle = {
    width: '43vw',
    paddingRight: 5,
};

const underlineStyle = {
    width: '43vw'
};

class EmailCheckContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            editing: true
        };
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onEmailSubmit = this.onEmailSubmit.bind(this);
        this.onCodeSubmit = this.onCodeSubmit.bind(this);
    }

    onEmailChange(e, val) {
        this.setState({ email: val });
    }

    onEmailSubmit() {
        this.setState({ editing: false });
        // todo: make post request
    }

    onCodeSubmit() {

    }

    render() {
        return (
            <VerificationTemplate header="验证学生身份">
                <div className="email-check-container">
                    <p className="content">UBC邮箱</p>
                    <div className="email-check-img"><EmailImg/></div>
                    {
                        this.state.editing ?
                            <div className="email-input">
                                <TextField
                                    style={inputStyle}
                                    underlineStyle={underlineStyle}
                                    hintText="输入邮箱"
                                    onChange={this.onEmailChange}
                                    value={this.state.email}
                                />
                                <span className="email-suffix">@alumni.ubc.ca</span>
                            </div> :
                            <div className="email-display">
                                <span className="email-suffix">{`${this.state.email}@alumni.ubc.ca`}</span>

                            </div>
                    }
                    <RaisedButton
                        onClick={this.onEmailSubmit}
                        backgroundColor={PRIMARY_GREEN}
                        fullWidth={true}
                        style={{marginBottom: 12}}
                        label="提交"
                        labelColor={PRIMARY_WHITE}
                    />
                    <a href="https://it.ubc.ca/services/email-voice-internet/student-alumni-email-service" className="link">
                        如何获取UBC邮箱
                    </a>
                </div>
            </VerificationTemplate>
        )
    }
}

export default EmailCheckContainer;