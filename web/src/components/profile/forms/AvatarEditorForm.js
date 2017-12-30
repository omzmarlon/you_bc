import React from 'react';
import PropTypes from 'prop-types';
//colors
import {PRIMARY_GREEN} from "../../../styles/constants/colors";
//icons
import FaceIcon from 'material-ui/svg-icons/action/face';
//components
import ModalForm from "../../common/form/ModalForm";
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
// redux
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {updateAvatar} from "../../../actions/profile/profileUpdateActions";
import {hideAvatarForm} from "../../../actions/profile/profileUIActions";
import {showInfoBar} from "../../../actions/global/globalActions";

class AvatarEditorForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avatar: ''
        };
    }

    rejectAvatarEdit(rejectMsg) {
        this.props.onFail(rejectMsg);
        this.onCloseHandler();
    }

    chooseImageHandler(evt) {
        const tgt = evt.target;
        const files = tgt.files;

        // FileReader support
        if (FileReader && files && files.length) {
            const fr = new FileReader();
            fr.onload = () => {
                console.log(this);
                this.setState({avatar: fr.result});
            };
            const fileType = files[0]["type"];
            const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
            if (validImageTypes.indexOf(fileType) === -1) {
                this.rejectAvatarEdit('同学必须上传图片噢');
            }
            if (files[0].size > 3145728) {
                this.rejectAvatarEdit('同学的图片不得超过 3MB 噢😢');
            }
            fr.readAsDataURL(files[0]);
        }
        // Not supported
        else {
            this.rejectAvatarEdit('同学的浏览器不支持图片编辑噢😢');
        }
    }

    onDoneHandler() {
        this.props.onDone(this.refs.cropper.getCroppedCanvas().toDataURL());
        this.onCloseHandler();
    }

    onCloseHandler() {
        this.setState({avatar: ''});
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
                <input type="file" ref={(input) => {if (input) {input.onchange = this.chooseImageHandler.bind(this)}}}/>
                {
                    this.state.avatar &&
                    <Cropper
                        ref='cropper'
                        src={this.state.avatar}
                        style={{height: 400, width: '100%'}}
                        // Cropper.js options
                        aspectRatio={1}
                        guides={true}
                    />
                }
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
        onDone: updateAvatar,
        onClose: hideAvatarForm,
        onFail: showInfoBar
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(AvatarEditorForm);
