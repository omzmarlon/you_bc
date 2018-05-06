import React from 'react';
import PropTypes from 'prop-types';
import {Dialog, IconButton} from "material-ui";
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import CheckIcon from '../svg/CheckIcon';
import "./SurveyCompleteModal.less";

const closeIconStyle = {
    position: 'absolute',
    top: 12,
    right: 8
};

const SurveyCompleteModal = (props) => {
    return (
        <Dialog open={props.openModal} onRequestClose={props.onClose} style={{top: '-6vh'}}>
            <IconButton onClick={props.onClose} style={closeIconStyle}>
                <CloseIcon/>
            </IconButton>
            <div className="survey-complete-modal-body">
                <CheckIcon/>
                <p className="text-1">恭喜你</p>
                <p className="text-2">现在开始可以查看你和其他用户的契合度</p>
            </div>
        </Dialog>
    );
};

SurveyCompleteModal.propTypes = {
    openModal: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default SurveyCompleteModal;
