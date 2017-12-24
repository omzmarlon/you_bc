'use strict';
import React from 'react';
import PropTypes from 'prop-types';
//components
import ModalForm from "../../common/form/ModalForm";
import TextInput from "../../common/form/TextInput";
import MenuInput from "../../common/form/MenuInput";
//styles
import "../../../styles/constants/misc.less";
//icons
import AccountIcon from 'material-ui/svg-icons/action/account-circle';
import WeChatIcon from "../../common/svg/WeChatIcon";
import MajorIcon from "../../common/svg/MajorIcon";
import CourseIcon from "../../common/svg/CourseIcon";
import MottoIcon from "../../common/svg/MottoIcon";
import TagIcon from "../../common/svg/TagIcon";
//colors
import {PRIMARY_RED, SECONDARY_RED} from "../../../styles/constants/colors";

const ClassmatesForm = (props) => (
    <ModalForm showForm={props.showForm}
               confirmButtonColor={PRIMARY_RED}
               onDone={props.onDone}
               onCancel={props.onCancel}
               titleIcon={<AccountIcon/>}
               titleText={'找课友信息'}
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
                   inputIcon={<MajorIcon viewBox="0 0 18 24.031" color={SECONDARY_RED}/>}
                   label={'专业'}
                   values={props.major}
                   onChange={props.onMajorChange}
                   options={props.majorOptions}
                   textColor={'white'}
                   tagDisplay={false}
                   tagColor={PRIMARY_RED}
                   multiple={false}
        />
        <MenuInput classNames={'form-input-field'}
                   inputIcon={<CourseIcon viewBox="0 0 22 20" color={SECONDARY_RED}/>}
                   label={'课程'} values={props.courses}
                   onChange={props.onCoursesChange}
                   options={props.coursesOptions}
                   textColor={'white'}
                   tagColor={PRIMARY_RED}
                   tagDisplay={false}
                   multiple={true}
        />
        <TextInput classNames={'form-input-field'}
                   inputIcon={<MottoIcon viewBox="0 0 32 30" color={SECONDARY_RED}/>}
                   label={'一句话'}
                   onChange={props.onSelfDescriptionChange}
                   value={props.selfDescription}
        />
        <MenuInput classNames={'form-input-field'}
                   inputIcon={<TagIcon viewBox="0 0 32 32" color={SECONDARY_RED}/>}
                   label={'标签'}
                   values={props.tags}
                   onChange={props.onTagChange}
                   options={props.tagsOptions}
                   tagColor={PRIMARY_RED}
                   textColor={'white'}
                   tagDisplay={true}
                   multiple={true}
        />
    </ModalForm>
);

ClassmatesForm.propTypes = {
    showForm: PropTypes.bool.isRequired,
    // form values:
    major: PropTypes.string.isRequired,
    courses: PropTypes.arrayOf(PropTypes.string).isRequired,
    selfDescription: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    //options
    majorOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
    coursesOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
    tagsOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
    // on form values change:
    onMajorChange: PropTypes.func.isRequired,
    onCoursesChange: PropTypes.func.isRequired,
    onSelfDescriptionChange: PropTypes.func.isRequired,
    onTagChange: PropTypes.func.isRequired,
    // on done/cancel
    onDone: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    // WeChat Number
    showWeChatInput: PropTypes.bool.isRequired,
    weChatId: PropTypes.string,
    onWeChatIdChange: PropTypes.func
};

export default ClassmatesForm;
