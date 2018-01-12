'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import VerificationTemplate from "../../components/verification/VerificationTemplate";
import LocationImg from "../../components/common/svg/LocationImg";
import {RaisedButton} from "material-ui";
import Progress from 'material-ui/CircularProgress';
import './LocationCheckContainer.less';
import {GENERAL_TEXT, PRIMARY_GREEN, PRIMARY_WHITE} from "../../styles/constants/colors";
//redux
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {showInfoBar} from "../../actions/global/globalActions";
import {postVerifyLocation, switchVerificationMethod} from "../../actions/global/verificationActions";

class LocationCheckContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isVerifying: false
        };
        this.onClickVerify = this.onClickVerify.bind(this);
        this.verifyLocation = this.verifyLocation.bind(this);
    }

    verifyLocation(position) {
        // center of UBC: 49.2606  -123.2460
        // max tolerance 0.028999999999997833
        const ubcLat  = 49.2606;
        const ubcLong = -123.2460;
        const tolerance = 0.028999999999997833;

        const distance = Math.sqrt(Math.pow(ubcLat-position.coords.latitude, 2) + Math.pow(ubcLong-position.coords.longitude, 2));
        //distance < tolerance
        if (true) { // disable location for now
            this.props.verify();
            this.props.showInfoBar("认证成功");
        } else {
            this.props.showInfoBar("认证失败, 请使用其他验证方式");
            this.setState({isVerifying: false});
        }

    }

    onClickVerify() {
        if (navigator.geolocation) {
            this.setState({isVerifying: true});
            navigator.geolocation.getCurrentPosition(this.verifyLocation);
        } else {
            this.props.showInfoBar("同学的浏览器不支持地理位置获取，请用其他方式认证");
        }
    }

    render() {
        return (
            <VerificationTemplate
                header="验证学生身份"
            >
                <div className="location-check-container">
                    <p className="content">为了确认用户 <span className="highlight">UBC学生身份</span> ，我们需要获取您的地理位置</p>
                    <div className="location-check-img"><LocationImg/></div>
                    {
                        this.state.isVerifying ?
                            <Progress/>:
                            <div style={{width: '100%'}}>
                                <RaisedButton
                                    onClick={this.onClickVerify}
                                    backgroundColor={PRIMARY_GREEN}
                                    fullWidth={true}
                                    style={{marginBottom: 12}}
                                    label={'好的'}
                                    labelColor={PRIMARY_WHITE}
                                />
                                <RaisedButton
                                    onClick={() => {this.props.switchVerification('card')}}
                                    fullWidth={true}
                                    style={{marginBottom: 12}}
                                    label="其他方式验证"
                                    labelColor={GENERAL_TEXT}
                                />
                            </div>
                    }
                </div>
            </VerificationTemplate>
        )
    }
}

LocationCheckContainer.propTypes = {
    isVerified: PropTypes.bool.isRequired,
    showInfoBar: PropTypes.func.isRequired,
    verify: PropTypes.func.isRequired,
    switchVerification: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
    isVerified: state.verification.isLocationVerified
});

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({
        showInfoBar: showInfoBar,
        verify: postVerifyLocation,
        switchVerification: switchVerificationMethod
    }, dispatch)
);


export default connect(mapStateToProps, mapDispatchToProps)(LocationCheckContainer);