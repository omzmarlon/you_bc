'use strict';

import React, {Component} from 'react';
import VerificationTemplate from "../../components/verification/VerificationTemplate";
import './CodeCheckContainer.less';
import {RaisedButton, TextField} from "material-ui";
import {PRIMARY_GREEN, PRIMARY_WHITE} from "../../styles/constants/colors";
import EmailImg from "../../components/common/svg/EmailImg";
import {VerificationCodes} from "../../constants/misc";
//redux
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {postVerifyCode} from "../../actions/global/verificationActions";

const inputStyle = {
    width: '43vw',
    paddingRight: 5
};

const underlineStyle = {
    width: '43vw'
};

class CodeCheckContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: "",
            checked: true
        };
        this.onCodeChange = this.onCodeChange.bind(this);
        this.onCodeSubmit = this.onCodeSubmit.bind(this);
    }

    onCodeChange(e, val) {
        this.setState({ code: val });
    }

    onCodeSubmit() {
        if (VerificationCodes.includes(this.state.code)) {
            this.setState({checked: true});
            this.props.verifyCode();
        } else {
            this.setState({checked: false});
        }
    }

    render() {
        return (
            <VerificationTemplate header="验证学生身份" onClickGoBack={() => {}}>
                <div className="code-check-container">
                    <p className="content">邀请码</p>
                    <div className="code-check-img"><EmailImg/></div>
                    <div className="code-input">
                        <TextField
                            id="code"
                            style={inputStyle}
                            underlineStyle={underlineStyle}
                            hintText="请输入邀请码"
                            errorText={this.state.checked ? null : "邀请码不正确，请确认后重试"}
                            onChange={this.onCodeChange}
                            value={this.state.code}
                        />
                    </div>
                    <RaisedButton
                        onClick={this.onCodeSubmit}
                        backgroundColor={PRIMARY_GREEN}
                        fullWidth={true}
                        style={{marginBottom: 12}}
                        label="提交"
                        labelColor={PRIMARY_WHITE}
                        disabled={this.state.code === ""}
                    />
                </div>
            </VerificationTemplate>
        )
    }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({
        verifyCode: postVerifyCode
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(CodeCheckContainer);