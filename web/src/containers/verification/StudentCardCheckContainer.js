'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import VerificationTemplate from "../../components/verification/VerificationTemplate";
import {RaisedButton} from "material-ui";
import {GENERAL_TEXT, PRIMARY_GREEN, PRIMARY_WHITE} from "../../styles/constants/colors";
import StudentCard from "../../components/common/svg/StudentCard";
import "./StudentCardCheckContainer.less";
import Progress from 'material-ui/CircularProgress';
//redux
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {switchVerificationMethod} from "../../actions/global/verificationActions";
import {showInfoBar} from "../../actions/global/globalActions";
import {uploadImageHelper} from "../../components/helpers/imageUploadHelpers";
import {requestUrl, STUDENT_CARD_VERIFICATION_API} from "../../constants/api";
import CheckIcon from "../../components/common/svg/CheckIcon";

class StudentCardCheckContainer extends Component {

    constructor(props) {
        super(props);
        this.state ={
            studentCard: '',
            studentCardDataUrl: '',
            isLoading: false,
            studentCardUploaded: this.props.studentCardUploaded
        };
    }

    setFileState(file) {
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            this.setState({studentCardDataUrl: e.target.result});
            this.setState({studentCard: file});
            this.setState({isLoading: false});
        };
        this.setState({isLoading: true});
        fileReader.readAsDataURL(file);
    }

    handleChooseImage(event) {
        const tgt = event.target;
        const files = tgt.files;
        if (files && files.length) {
            // check file validity
            const fileType = files[0]["type"];
            const validImageTypes = ["image/jpeg", "image/png"];
            if (validImageTypes.indexOf(fileType) === -1) {
                this.props.showInfoBar('同学必须上传图片噢');
            } else if (files[0].size > 3145728) {
                this.props.showInfoBar('同学的照片不能超过3MB哦');
            } else {
                this.setFileState(files[0]);
            }
        } else {
            this.props.showInfoBar('同学须至少上传一张图片噢');
        }
    }

    handleUploadImage() {
        //prepare form data
        let formData = new FormData();
        formData.append("image", this.state.studentCard);

        this.setState({isLoading: true});
        uploadImageHelper(requestUrl(STUDENT_CARD_VERIFICATION_API), formData)
            .then(
                response => {
                    // TODO: should we dispatch fetch verification actions here?
                    this.setState({studentCardUploaded: true});
                    this.props.showInfoBar("学生卡上传成功！");
                },
                err => this.props.showInfoBar('上传图片失败')
            )
            .finally(() => this.setState({isLoading: false}));
    }

    mainContentDisplayHelper() {
        if (this.state.studentCardUploaded) {
            return <CheckIcon/>
        } else {
            if (this.state.studentCard) {
                return <img src={this.state.studentCardDataUrl} style={{width: '36vw', height: '28vw'}}/>;
            } else {
                return <StudentCard/>;
            }
        }
    }

    render() {


        return (
            <VerificationTemplate
                header="验证学生身份"
                onClickGoBack={() => {this.props.switchVerification('location')}}
            >
                <div className={"student-card-check-container"}>

                    {
                        this.state.studentCardUploaded?
                            <p className="content">
                                同学你的学生卡已经成功上传, 我们会尽快审核
                            </p>:
                            <p className="content">
                                为了确认用户 <span className="highlight">UBC学生身份</span> ，需要上传同学的学生卡
                            </p>
                    }
                    {
                        this.state.isLoading?
                            <Progress style={{margin: '35px auto'}} size={50} />:
                            <div className="student-card-check-img">
                                {this.mainContentDisplayHelper()}
                            </div>
                    }
                    <RaisedButton
                        // turn this boolean off so that user can preview image
                        onClick={() => {this.setState({studentCardUploaded: false})}}
                        backgroundColor={PRIMARY_GREEN}
                        fullWidth={true}
                        style={{marginBottom: 12}}
                        label={this.state.studentCard || this.state.studentCardUploaded?'换一张学生卡':'选取学生卡'}
                        disabled={this.state.isLoading}
                        labelColor={PRIMARY_WHITE}
                        containerElement="label"
                    >
                        <input type="file"
                               style={{ display: 'none' }}
                               onChange={this.handleChooseImage.bind(this)}
                               disabled={this.state.isLoading}
                        />
                    </RaisedButton>
                    {
                        this.state.studentCard && !this.state.studentCardUploaded &&
                        <RaisedButton
                            onClick={this.handleUploadImage.bind(this)}
                            backgroundColor={PRIMARY_GREEN}
                            fullWidth={true}
                            style={{marginBottom: 12}}
                            label={'上传'}
                            disabled={this.state.isLoading}
                            labelColor={PRIMARY_WHITE}
                        />
                    }

                    {/*TODO: reopen email verification*/}
                    {/*<RaisedButton*/}
                        {/*onClick={() => {this.props.switchVerification('email')}}*/}
                        {/*fullWidth={true}*/}
                        {/*style={{marginBottom: 12}}*/}
                        {/*label="其他方式验证"*/}
                        {/*labelColor={GENERAL_TEXT}*/}
                        {/*disabled={this.state.isLoading}*/}
                    {/*/>*/}
                </div>
            </VerificationTemplate>
        )
    }
}

StudentCardCheckContainer.propTypes = {
    switchVerification: PropTypes.func.isRequired,
    showInfoBar: PropTypes.func.isRequired,
    studentCardUploaded: PropTypes.bool.isRequired
};

const mapStateToProps = (state, ownProps) => ({
    studentCardUploaded: state.verification.pending === 'card'
});

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({
        switchVerification: switchVerificationMethod,
        showInfoBar: showInfoBar
    }, dispatch)
);


export default connect(mapStateToProps, mapDispatchToProps)(StudentCardCheckContainer);