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
import {defaultIconSize} from "../../../styles/material/iconStyles";
import "./RoommatesForm.less";
//icons
import AccountIcon from 'material-ui/svg-icons/action/account-circle';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import WeChatIcon from "../../common/img/WeChatIcon";
import HometownIcon from "../../common/svg/HometownIcon";
//colors
import {PRIMARY_BLUE, SECONDARY_BLUE} from "../../../styles/constants/colors";
import LocationIcon from "../../common/svg/LocationIcon";
import MottoIcon from "../../common/svg/MottoIcon";
import TagIcon from "../../common/svg/TagIcon";
import {formSize} from "../../../styles/material/formStyles";

class RoommatesForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Dialog
                contentStyle={formSize}
                open={this.props.showForm}
                actions={[
                    <RaisedButton
                        onClick={this.props.onDone}
                        backgroundColor={PRIMARY_BLUE}
                        fullWidth={true}
                    >
                        确定
                    </RaisedButton>
                ]}
                title={
                    <div className={'title'}>
                        <div className={'title-info'}>
                            <AccountIcon />
                            <span className={'title-text'}>找室友信息</span>
                        </div>
                        <IconButton onClick={this.props.onCancel}>
                            <CloseIcon/>
                        </IconButton>
                    </div>
                }
            >
                {
                    this.props.showWeChatInput &&
                    <TextInput classNames={'roommates-form-input-field'}
                               inputIcon={<WeChatIcon />}
                               label={'微信号'}
                               onChange={this.props.onWeChatIdChange}
                               value={this.props.weChatId}
                    />
                }
                <MenuInput classNames={'roommates-form-input-field'}
                           inputIcon={<LocationIcon viewBox="0 0 24 32" color={SECONDARY_BLUE}/>}
                           label={'地点'}
                           values={this.props.location}
                           onChange={this.props.onLocationChange}
                           options={this.props.locationOptions}
                           textColor={'white'}
                           tagDisplay={false}
                           tagColor={PRIMARY_BLUE}
                           multiple={false}
                />
                <MenuInput classNames={'roommates-form-input-field'}
                           inputIcon={<HometownIcon viewBox="0 0 26 31.969" color={SECONDARY_BLUE}/>}
                           label={'家乡'}
                           values={this.props.hometown}
                           onChange={this.props.onLocationChange}
                           options={this.props.hometownOptions}
                           textColor={'white'}
                           tagDisplay={false}
                           tagColor={PRIMARY_BLUE}
                           multiple={false}
                />
                <TextInput classNames={'roommates-form-input-field'}
                           inputIcon={<MottoIcon viewBox="0 0 32 30" color={SECONDARY_BLUE}/>}
                           label={'一句话'}
                           onChange={this.props.onMottoChange}
                           value={this.props.motto}
                />
                <MenuInput classNames={'roommates-form-input-field'}
                           inputIcon={<TagIcon viewBox="0 0 32 32" color={SECONDARY_BLUE}/>}
                           label={'标签'}
                           values={this.props.tags}
                           onChange={this.props.onTagChange}
                           options={this.props.tagsOptions}
                           tagColor={PRIMARY_BLUE}
                           textColor={'white'}
                           tagDisplay={true}
                           multiple={true}
                />
            </Dialog>
        );
    }
}

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
