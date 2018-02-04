'use strict';
import React from 'react';
import PropTypes from 'prop-types';
//components
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
//styles
import "./ModalForm.less";
import {modalStyles} from "../../../styles/constants/modal";
//icons
import CloseIcon from 'material-ui/svg-icons/navigation/close';

const ModalForm = (props) => (
    <Dialog
        contentStyle={ modalStyles.dialogContent }
        bodyStyle={ {...modalStyles.dialogBody, ...(props.forceMinHeight?{minHeight: '40vh'}:{})} }
        style={ modalStyles.dialogRoot }
        repositionOnUpdate={ false }
        autoScrollBodyContent={true}
        autoDetectWindowHeight={!props.forceMinHeight}
        open={props.showForm}
        actions={[
            <RaisedButton
                onClick={props.onDone}
                backgroundColor={props.confirmButtonColor}
                fullWidth={true}
            >
                确定
            </RaisedButton>
        ]}
        title={
            <div className={'title'}>
                <div className={'title-info'}>
                    {props.titleIcon}
                    <span className={'title-text'}>{props.titleText}</span>
                </div>
                <IconButton onClick={props.onClose}>
                    <CloseIcon/>
                </IconButton>
            </div>
        }
    >
        {props.children}
    </Dialog>
);

ModalForm.propTypes = {
    showForm: PropTypes.bool.isRequired,
    confirmButtonColor: PropTypes.string.isRequired,
    onDone: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    titleIcon: PropTypes.element.isRequired,
    titleText: PropTypes.string.isRequired,
    forceMinHeight: PropTypes.bool
};

export default ModalForm;
