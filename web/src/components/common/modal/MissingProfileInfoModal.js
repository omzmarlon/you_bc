import React from "react";
import PropTypes from "prop-types";
import {Dialog, RaisedButton} from "material-ui";
import "./MissingProfileInfoModal.less";
import {PRIMARY_GREEN, PRIMARY_WHITE} from "../../../styles/constants/colors";
import {Link} from "react-router-dom";
import {TO_PROFILE} from "../../../constants/api";

const closeIconStyle = {
    position: 'absolute',
    top: 12,
    right: 8
};

const MissingProfileInfoModal = (props) => {
    return (
        <Dialog
            open={props.openModal}
            style={{top: '-6vh'}}
            actionsContainerClassName="survey-complete-modal-buttons"
            actions={[
                <Link style={{width: '100%'}} to={TO_PROFILE} >
                    <RaisedButton
                        backgroundColor={PRIMARY_GREEN}
                        fullWidth={true}
                        label="去填写"
                        labelColor={PRIMARY_WHITE}
                        onClick={props.onClick}
                    />
                </Link>
            ]}
        >
            <p className="survey-complete-modal-text">{props.content}</p>
        </Dialog>
    );
};

MissingProfileInfoModal.propTypes = {
    openModal: PropTypes.bool.isRequired,
    content: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export default MissingProfileInfoModal;
