'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {Dialog, RaisedButton} from "material-ui";
import "./MatchSuccessModal.less";
import {GENERAL_TEXT, PRIMARY_RED, PRIMARY_WHITE} from "../../../styles/constants/colors";
import PokeAvatar from "../../common/PokeAvatar";
import RibbonIcon from "../../common/svg/RibbonIcon";

const MatchSuccessModal = (props) => {
    return (
        <Dialog
            open={props.openModal}
            style={{top: '-6vh'}}
            bodyStyle={{padding: 0}}
            actions={[
                <RaisedButton
                    onClick={props.addWeChat}
                    backgroundColor={PRIMARY_RED}
                    fullWidth={true}
                    style={{marginBottom: 12}}
                    label="+ 加微信"
                    labelColor={PRIMARY_WHITE}
                />,
                <RaisedButton
                    onClick={props.onClose}
                    fullWidth={true}
                    style={{marginBottom: 12}}
                    label="稍后再说"
                    labelColor={GENERAL_TEXT}
                />
            ]}
        >
            <div className="match-success-modal-header">
                <RibbonIcon className="header-ribbon"/>
                <p className="header-text">恭喜你们</p>
            </div>
            <div className="match-success-modal-body">
                <p className="match-success-modal-text1">在 <span>0.00049</span> 的几率下相遇</p>
                <PokeAvatar img={props.img} name={props.name}/>
                <p className="match-success-modal-text2">微信号： {props.weChatId}</p>
            </div>
        </Dialog>
    );
};

MatchSuccessModal.propTypes = {
    addWeChat: PropTypes.func.isRequired,
    openModal: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    weChatId: PropTypes.string,
    img: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};

export default MatchSuccessModal;
