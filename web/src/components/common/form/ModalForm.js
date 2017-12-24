'use strict';
import React from 'react';
import PropTypes from 'prop-types';
//components
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
//styles
import {formSize} from "../../../styles/material/formStyles";
import "./ModalForm.less";
//icons
import CloseIcon from 'material-ui/svg-icons/navigation/close';

const ModalForm = (props) => (
    <Dialog
        contentStyle={formSize}
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
                <IconButton onClick={props.onCancel}>
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
    onCancel: PropTypes.func.isRequired,
    titleIcon: PropTypes.element.isRequired,
    titleText: PropTypes.string.isRequired
};

export default ModalForm;
