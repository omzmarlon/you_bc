'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import VerificationTemplate from "../../components/verification/VerificationTemplate";
import {RaisedButton} from "material-ui";
import {GENERAL_TEXT, PRIMARY_GREEN, PRIMARY_WHITE} from "../../styles/constants/colors";
import StudentCard from "../../components/common/svg/StudentCard";
import "./StudentCardCheckContainer.less";

class StudentCardCheckContainer extends Component {
    render() {
        return (
            <VerificationTemplate header="验证学生身份">
                <div className={"student-card-check-container"}>
                    <p className="content">为了确认用户 <span className="highlight">UBC学生身份</span> ，需要上传同学的学生卡</p>
                    <div className="student-card-check-img"><StudentCard/></div>
                    <RaisedButton
                        onClick={() => {}}
                        backgroundColor={PRIMARY_GREEN}
                        fullWidth={true}
                        style={{marginBottom: 12}}
                        label="上传"
                        labelColor={PRIMARY_WHITE}
                    />
                    <RaisedButton
                        onClick={() => {}}
                        fullWidth={true}
                        style={{marginBottom: 12}}
                        label="其他方式验证"
                        labelColor={GENERAL_TEXT}
                    />
                </div>
            </VerificationTemplate>
        )
    }
}

export default StudentCardCheckContainer;