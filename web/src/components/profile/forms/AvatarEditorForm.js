import React from 'react';
import PropTypes from 'prop-types';
//colors
import {PRIMARY_GREEN} from "../../../styles/constants/colors";
//icons
import FaceIcon from 'material-ui/svg-icons/action/face';
import Progress from 'material-ui/CircularProgress';
//components
import ModalForm from "../../common/form/ModalForm";
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
// redux
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {updateAvatarRequest} from "../../../actions/profile/profileUpdateActions";
import {hideAvatarForm} from "../../../actions/profile/profileUIActions";
import {showInfoBar} from "../../../actions/global/globalActions";
// api
import {requestUrl, UPLOAD_IMAGE_API, UPLOAD_IMAGE_EDIT_API} from "../../../constants/api";
import {uploadImageHelper} from "../../helpers/imageUploadHelpers";

class AvatarEditorForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editAvatarUrl: '',
            isUploading: false
        };
    }

    rejectAvatarEdit(rejectMsg) {
        this.props.onFail(rejectMsg);
        this.onCloseHandler();
    }

    handleChooseImage(event) {
        const tgt = event.target;
        const files = tgt.files;
        if (files && files.length) {
            // check file validity
            const fileType = files[0]["type"];
            const validImageTypes = ["image/jpeg", "image/png"];
            if (validImageTypes.indexOf(fileType) === -1) {
                this.rejectAvatarEdit('同学必须上传图片噢');
            } else {
                //prepare form data
                let formData = new FormData();
                formData.append("image", files[0]);

                this.setState({isUploading: true});
                uploadImageHelper(requestUrl(UPLOAD_IMAGE_EDIT_API), formData)
                    .then(
                        response => this.setState({editAvatarUrl: response.data}),
                        err => this.rejectAvatarEdit('选取图片失败')
                    )
                    .finally(() => this.setState({isUploading: false}));
            }
        } else {
            this.rejectAvatarEdit('同学须至少上传一张图片噢');
        }
    }

    onDoneHandler() {
        this.refs.cropper.getCroppedCanvas().toBlob((blob) => {
            console.log(blob);
            if (blob) {
                let formData = new FormData();
                formData.append("image", blob);
                this.setState({isUploading: true});
                uploadImageHelper(requestUrl(UPLOAD_IMAGE_API), formData)
                    .then(
                        response => this.props.onDone(response.data),
                        err => this.rejectAvatarEdit('上传图片失败')
                    )
                    .finally(() => {
                        this.setState({isUploading: false});
                        this.onCloseHandler();
                    });
            } else {
                this.rejectAvatarEdit("编辑图片失败😢");
            }
        });
    }

    onCloseHandler() {
        this.setState({editAvatarUrl: '', isUploading: false});
        this.props.onClose();
    }

    render() {
        return (
            <ModalForm
                showForm={this.props.showAvatarForm}
                confirmButtonColor={PRIMARY_GREEN}
                onDone={this.onDoneHandler.bind(this)}
                onClose={this.onCloseHandler.bind(this)}
                titleIcon={<FaceIcon/>}
                titleText={'上传新头像'}
            >
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <input type="file" onChange={this.handleChooseImage.bind(this)}/>
                    { this.state.isUploading && <Progress style={{margin: '35px auto'}} size={50} /> }
                    {
                        this.state.editAvatarUrl && !this.state.isUploading &&
                        <Cropper
                            ref='cropper'
                            src={this.state.editAvatarUrl}
                            style={{height: 400, width: '100%'}}
                            // Cropper.js options
                            aspectRatio={1}
                            guides={true}
                        />
                    }
                </div>
            </ModalForm>
        );
    }
}

AvatarEditorForm.propTypes = {
    showAvatarForm: PropTypes.bool.isRequired,
    onDone: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onFail: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
    showAvatarForm: state.profileUI.showAvatarForm,
});

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({
        onDone: updateAvatarRequest,
        onClose: hideAvatarForm,
        onFail: showInfoBar
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(AvatarEditorForm);
