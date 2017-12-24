'use strict';
import React from 'react';
import PropTypes from 'prop-types';
//components
import ModalForm from "../../common/form/ModalForm";
import TextInput from "../../common/form/TextInput";
import MenuInput from "../../common/form/MenuInput";
//icons
import AccountIcon from 'material-ui/svg-icons/action/account-circle';
import WeChatIcon from "../../common/svg/WeChatIcon";
import MottoIcon from "../../common/svg/MottoIcon";
import TagIcon from "../../common/svg/TagIcon";
//colors
import {PRIMARY_YELLOW, SECONDARY_YELLOW} from "../../../styles/constants/colors";
import FacultyIcon from "../../common/svg/FacultyIcon";
import RelationshipIcon from "../../common/svg/RelationshipIcon";

const FriendsForm = (props) => (
    <ModalForm showForm={props.showForm}
               confirmButtonColor={PRIMARY_YELLOW}
               onDone={props.onDone}
               onCancel={props.onCancel}
               titleIcon={<AccountIcon/>}
               titleText={'找_友信息'}
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
        <MenuInput inputIcon={<FacultyIcon/>}
                   label={'学院'}
                   values={props.faculty}
                   onChange={props.onFacultyChange}
                   options={props.facultyOptions}
                   tagColor={PRIMARY_YELLOW}
                   textColor={'white'}
                   tagDisplay={false}
                   multiple={false}
        />
        <MenuInput inputIcon={<RelationshipIcon viewBox="0 0 20 19" color={SECONDARY_YELLOW} />}
                   label={'情感状况'}
                   values={props.relationship}
                   onChange={props.onFacultyChange}
                   options={props.relationshipOptions}
                   tagColor={PRIMARY_YELLOW}
                   textColor={'white'}
                   tagDisplay={false}
                   multiple={false}
        />
        <TextInput classNames={'form-input-field'}
                   inputIcon={<MottoIcon viewBox="0 0 32 30" color={SECONDARY_YELLOW}/>}
                   label={'一句话'}
                   onChange={props.onMottoChange}
                   value={props.motto}
        />
        <MenuInput classNames={'form-input-field'}
                   inputIcon={<TagIcon viewBox="0 0 32 32" color={SECONDARY_YELLOW}/>}
                   label={'标签'}
                   values={props.tags}
                   onChange={props.onTagChange}
                   options={props.tagsOptions}
                   tagColor={PRIMARY_YELLOW}
                   textColor={'white'}
                   tagDisplay={true}
                   multiple={true}
        />
    </ModalForm>
);

FriendsForm.propTypes = {
    showForm: PropTypes.bool.isRequired,
    //form values:
    faculty: PropTypes.string.isRequired,
    relationship: PropTypes.string.isRequired,
    motto: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    // options
    facultyOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
    relationshipOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
    tagsOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
    // on form value changes
    onFacultyChange: PropTypes.func.isRequired,
    onRelationshipChange: PropTypes.func.isRequired,
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

export default FriendsForm;
