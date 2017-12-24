'use strict';
import React from 'react';
import PropTypes from 'prop-types';
//components
import TextInput from "../../common/form/TextInput";
import MenuInput from "../../common/form/MenuInput";
//styles
import "./RoommatesForm.less";
import "../../../styles/constants/misc.less";
//icons
import AccountIcon from 'material-ui/svg-icons/action/account-circle';
import WeChatIcon from "../../common/svg/WeChatIcon";
import HometownIcon from "../../common/svg/HometownIcon";
import LocationIcon from "../../common/svg/LocationIcon";
import MottoIcon from "../../common/svg/MottoIcon";
import TagIcon from "../../common/svg/TagIcon";
//colors
import {PRIMARY_BLUE, SECONDARY_BLUE} from "../../../styles/constants/colors";
import ModalForm from "../../common/form/ModalForm";

const RoommatesForm = (props) => (
    <ModalForm
        showForm={props.showForm}
        confirmButtonColor={PRIMARY_BLUE}
        onDone={props.onDone}
        onCancel={props.onCancel}
        titleIcon={<AccountIcon />}
        titleText={'找室友信息'}
    >
        {
            props.showWeChatInput &&
            <TextInput classNames={'form-input-field'}
                       inputIcon={<WeChatIcon />}
                       label={'微信号'}
                       onChange={props.onWeChatIdChange}
                       value={props.weChatId}
            />
        }
        <MenuInput classNames={'form-input-field'}
                   inputIcon={<LocationIcon viewBox="0 0 24 32" color={SECONDARY_BLUE}/>}
                   label={'地点'}
                   values={props.location}
                   onChange={props.onLocationChange}
                   options={props.locationOptions}
                   textColor={'white'}
                   tagDisplay={false}
                   tagColor={PRIMARY_BLUE}
                   multiple={false}
        />
        <MenuInput classNames={'form-input-field'}
                   inputIcon={<HometownIcon viewBox="0 0 26 31.969" color={SECONDARY_BLUE}/>}
                   label={'家乡'}
                   values={props.hometown}
                   onChange={props.onLocationChange}
                   options={props.hometownOptions}
                   textColor={'white'}
                   tagDisplay={false}
                   tagColor={PRIMARY_BLUE}
                   multiple={false}
        />
        <TextInput classNames={'form-input-field'}
                   inputIcon={<MottoIcon viewBox="0 0 32 30" color={SECONDARY_BLUE}/>}
                   label={'一句话'}
                   onChange={props.onMottoChange}
                   value={props.motto}
        />
        <MenuInput classNames={'form-input-field'}
                   inputIcon={<TagIcon viewBox="0 0 32 32" color={SECONDARY_BLUE}/>}
                   label={'标签'}
                   values={props.tags}
                   onChange={props.onTagChange}
                   options={props.tagsOptions}
                   tagColor={PRIMARY_BLUE}
                   textColor={'white'}
                   tagDisplay={true}
                   multiple={true}
        />
    </ModalForm>
);

RoommatesForm.propTypes = {
    showForm: PropTypes.bool.isRequired,
    // form values:
    location: PropTypes.string.isRequired,
    hometown: PropTypes.string.isRequired,
    motto: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    //options
    locationOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
    hometownOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
    tagsOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
    // on form values change:
    onLocationChange: PropTypes.func.isRequired,
    onHometownChange: PropTypes.func.isRequired,
    onMottoChange: PropTypes.func.isRequired,
    onTagChange: PropTypes.func.isRequired,
    // on done/cancel
    onDone: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    // WeChat Number
    showWeChatInput: PropTypes.bool.isRequired,
    weChatId: PropTypes.string,
    onWeChatIdChange: PropTypes.func
};

export default RoommatesForm;
