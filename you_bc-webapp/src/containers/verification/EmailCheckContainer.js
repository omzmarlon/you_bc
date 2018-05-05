'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import VerificationTemplate from "../../components/verification/VerificationTemplate";
import './EmailCheckContainer.less';
import {RaisedButton, TextField} from "material-ui";
import {PRIMARY_GREEN, PRIMARY_WHITE} from "../../styles/constants/colors";
import EmailImg from "../../components/common/svg/EmailImg";
import FlatButton from 'material-ui/FlatButton';
//redux
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {switchVerificationMethod} from "../../actions/global/verificationActions";

const inputStyle = {
    width: '43vw',
    paddingRight: 5
};

const underlineStyle = {
    width: '43vw'
};

const inputStyle2 = {
    width: '36vw',
    paddingLeft: 5
};

const underlineStyle2 = {
    width: '36vw'
};

class EmailCheckContainer extends Component {
    constructor(props) {
        super(props);
        // emailSubmitted should be in redux
        this.state = {
            email: "",
            emailSubmitted: false,
            code: ""

        };
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onEmailSubmit = this.onEmailSubmit.bind(this);
        this.onCodeChange = this.onCodeChange.bind(this);
        this.onCodeSubmit = this.onCodeSubmit.bind(this);
        this.editEmailHandler = this.editEmailHandler.bind(this);
    }

    onEmailChange(e, val) {
        this.setState({ email: val });
    }

    onEmailSubmit() {
        this.setState({ emailSubmitted: true });
        console.log('submit email');
        // todo: make post request
    }

    onCodeChange(e, val) {
        this.setState({ code: val });
    }

    onCodeSubmit() {
        // todo: make post request
        console.log('submit code');
    }

    editEmailHandler() {
        this.setState({ emailSubmitted: false });
    }

    render() {
        return (
            <VerificationTemplate
                header="验证学生身份"
                onClickGoBack={() => {this.props.switchVerification('card')}}
            >
                <div className="email-check-container">
                    <p className="content">UBC邮箱</p>
                    <div className="email-check-img"><EmailImg/></div>
                    {
                        this.state.emailSubmitted ?
                            <div className="verify-code-container">
                                <div className="email-display">
                                    <span className="--email">{`${this.state.email}@alumni.ubc.ca`}</span>
                                    <FlatButton
                                        label="修改"
                                        onClick={this.editEmailHandler}
                                        style={{minWidth: 0, paddingLeft: 8}}
                                        labelStyle={{padding: 0}}
                                    />
                                </div>
                                <div className="verification-code">
                                    <span className="--code">Code: </span>
                                    <TextField
                                        id="code"
                                        style={inputStyle2}
                                        underlineStyle={underlineStyle2}
                                        onChange={this.onCodeChange}
                                        value={this.state.code}
                                    />
                                </div>
                            </div> :
                            <div className="email-input">
                                <TextField
                                    id="email"
                                    style={inputStyle}
                                    underlineStyle={underlineStyle}
                                    hintText="输入邮箱"
                                    onChange={this.onEmailChange}
                                    value={this.state.email}
                                />
                                <span className="email-suffix">@alumni.ubc.ca</span>
                            </div>
                    }
                    <RaisedButton
                        onClick={this.state.emailSubmitted ? this.onCodeSubmit : this.onEmailSubmit}
                        backgroundColor={PRIMARY_GREEN}
                        fullWidth={true}
                        style={{marginBottom: 12}}
                        label="提交"
                        labelColor={PRIMARY_WHITE}
                        disabled={this.state.code === "" && this.state.emailSubmitted}
                    />
                    <a href="https://it.ubc.ca/services/email-voice-internet/student-alumni-email-service" className="link">
                        如何获取UBC邮箱
                    </a>
                </div>
            </VerificationTemplate>
        )
    }
}

EmailCheckContainer.propTypes = {
    switchVerification: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({

});

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({
        switchVerification: switchVerificationMethod
    }, dispatch)
);


export default connect(mapStateToProps, mapDispatchToProps)(EmailCheckContainer);