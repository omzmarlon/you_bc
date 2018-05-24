'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import VerificationTemplate from "../../components/verification/VerificationTemplate";
import './VerificationComponent.less';
import {RaisedButton, TextField} from "material-ui";
import {PRIMARY_GREEN, PRIMARY_WHITE} from "../../styles/constants/colors";
import EmailImg from "../../components/common/svg/EmailImg";

const inputStyle = {
    width: '43vw',
    paddingRight: 5
};

const underlineStyle = {
    width: '43vw'
};

class VerificationComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: ""
        };
        this.onCodeChange = this.onCodeChange.bind(this);
        this.onCodeSubmit = this.onCodeSubmit.bind(this);
    }

    onCodeChange(e, val) {
        this.setState({ code: val, errorText: ""});
    }

    onCodeSubmit() {
        let {dispatch} = this.props;
        this.props.onCodeSubmit(this.state.code);
    }

    render() {
        return (
            <VerificationTemplate header={`Welcome back! ${this.props.username}`}>
                <div className="code-check-container">
                    <p className="content">Verify Your Eligibility</p>
                    <div className="code-check-img"><EmailImg/></div>
                    <div className="code-input">
                        <TextField
                            id="code"
                            style={inputStyle}
                            underlineStyle={underlineStyle}
                            hintText="Enter Verification Code"
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

VerificationComponent.propTypes = {
    username: PropTypes.string.isRequired,
    onCodeSubmit: PropTypes.func.isRequired
};

export default VerificationComponent;