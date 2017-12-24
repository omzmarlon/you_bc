'use strict';
import React from 'react';
import PropTypes from 'prop-types';
//components
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import TextInput from "../../common/form/TextInput";
import MenuInput from "../../common/form/MenuInput";
//styles
import "./ClassmatesForm.less";
import {formSize} from "../../../styles/material/formStyles";
//icons
import AccountIcon from 'material-ui/svg-icons/action/account-circle';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import WeChatIcon from "../../common/svg/WeChatIcon";
import HometownIcon from "../../common/svg/HometownIcon";
import LocationIcon from "../../common/svg/LocationIcon";
import MottoIcon from "../../common/svg/MottoIcon";
import TagIcon from "../../common/svg/TagIcon";
//colors
import {PRIMARY_RED, SECONDARY_RED} from "../../../styles/constants/colors";


class ClassmatesForm extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Dialog>

            </Dialog>
        );
    }

}

export default ClassmatesForm;
