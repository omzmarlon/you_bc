'use strict';

import React, {Component} from 'react';
import VerificationTemplate from "../../components/verification/VerificationTemplate";
import LocationImg from "../../components/common/svg/LocationImg";
import {RaisedButton} from "material-ui";
import './LocationCheckContainer.less';
import {GENERAL_TEXT, PRIMARY_GREEN, PRIMARY_WHITE} from "../../styles/constants/colors";

class LocationCheckContainer extends Component {
    render() {
        return (
            <VerificationTemplate header="地理位置设定">
                <div className="location-check-container">
                    <p className="content">为了确认用户 <span className="highlight">UBC学生身份</span> ，我们需要获取您的地理位置</p>
                    <div className="location-check-img"><LocationImg/></div>
                    <RaisedButton
                        onClick={() => {}}
                        backgroundColor={PRIMARY_GREEN}
                        fullWidth={true}
                        style={{marginBottom: 12}}
                        label="好的"
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

export default LocationCheckContainer;