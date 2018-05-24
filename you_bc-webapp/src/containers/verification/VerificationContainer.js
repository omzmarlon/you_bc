'use strict';

import React, {Component} from 'react';
import VerificationTemplate from "../../components/verification/VerificationTemplate";
import './VerificationContainer.less';
import {RaisedButton, TextField} from "material-ui";
import {PRIMARY_GREEN, PRIMARY_WHITE} from "../../styles/constants/colors";
import EmailImg from "../../components/common/svg/EmailImg";
//redux
import {connect} from 'react-redux';
import {submitVerificationCode} from "../../requests/verificationRequests";
import {hideGlobalSpinner, showGlobalSpinner} from "../../actions/global/globalActions";
import {updateVerificationStatus} from "../../actions/global/verificationActions";
import AuthStatus from "../../utils/AuthStatus";
import { Redirect } from 'react-router-dom';
import {PRE_LOGIN} from "../../constants/api";


const inputStyle = {
    width: '43vw',
    paddingRight: 5
};

const underlineStyle = {
    width: '43vw'
};

class VerificationContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: "",
            errorText: ""
        };
        this.onCodeChange = this.onCodeChange.bind(this);
        this.onCodeSubmit = this.onCodeSubmit.bind(this);
    }

    onCodeChange(e, val) {
        this.setState({ code: val, errorText: ""});
    }

    onCodeSubmit() {
        let {dispatch} = this.props;

        dispatch(showGlobalSpinner());
        submitVerificationCode(this.state.code)
            .then(response => {
                dispatch(hideGlobalSpinner());
                dispatch(updateVerificationStatus(true));
            }, error => {
                // TODO centrolize error handling
                dispatch(hideGlobalSpinner());
                console.log(error);
                this.setState({errorText: "Incorrect verification code"});
            })
            .catch(error => {
                // TODO centrolize error handling
                dispatch(hideGlobalSpinner());
                console.log(error);
                this.setState({errorText: "Incorrect verification code"});
            });
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: "/" } };

        return (
            <VerificationTemplate header={`Welcome back!`} onClickGoBack={() => {}}>
                <div className="code-check-container">
                    <p className="content">Verify Your Eligibility</p>
                    <div className="code-check-img"><EmailImg/></div>
                    <div className="code-input">
                        <TextField
                            id="code"
                            style={inputStyle}
                            underlineStyle={underlineStyle}
                            hintText="Enter Verification Code"
                            errorText={this.state.errorText}
                            onChange={this.onCodeChange}
                            value={this.state.code}
                        />
                    </div>
                    <RaisedButton
                        onClick={this.onCodeSubmit}
                        backgroundColor={PRIMARY_GREEN}
                        fullWidth={true}
                        style={{marginBottom: 12}}
                        label="Submit"
                        labelColor={PRIMARY_WHITE}
                        disabled={this.state.code === ""}
                    />
                </div>
            </VerificationTemplate>
        );
    }
}

const mapStateToProps = state => ({
    approved: state.verification.approved
});

export default connect(mapStateToProps)(VerificationContainer);