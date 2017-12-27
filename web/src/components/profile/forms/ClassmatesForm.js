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

class ClassmatesForm extends React.Component {

    constructor(props) {
        // NOTE: this form does not allow updating options yet. If needed, move props values into states like below
        // onDoneHandler also need to change
        super(props);
        this.state = {
            weChatId: '',
            major: '',
            courses: [],
            motto: '',
            tags: [],
        };
        this.onWeChatIdChange = this.onWeChatIdChange.bind(this);
        this.onDoneHandler = this.onDoneHandler.bind(this);
        this.onMajorChange = this.onMajorChange.bind(this);
        this.onCoursesChange = this.onCoursesChange.bind(this);
        this.onMottoChange = this.onMottoChange.bind(this);
        this.onTagChange = this.onTagChange.bind(this);
    }

    componentWillReceiveProps() {
        this.setState({
            weChatId: this.props.weChatId,
            major: this.props.major,
            courses: this.props.courses,
            motto: this.props.motto,
            tags: this.props.tags
        });
    }

    onWeChatIdChange(event, newValue) {
        this.setState({weChatId: newValue})
    }

    onMajorChange(event, menuItem, index) {
        this.setState({major: this.props.majorOptions[index]});
    }

    onCoursesChange(event, menuItem, index) {
        const ind = this.state.courses.indexOf(this.props.coursesOptions[index]);
        if (ind === -1) {
            this.setState({courses: [...this.state.courses, this.props.coursesOptions[index]]});
        } else {
            const courses = this.state.courses;
            courses.splice(ind, 1);
            this.setState({courses: courses});
        }
    }

    onMottoChange(event, newValue) {
        this.setState({motto: newValue})
    }

    onTagChange(event, menuItem, index) {
        const ind = this.state.tags.indexOf(this.props.tagsOptions[index]);
        if (ind === -1) {
            this.setState({tags: [...this.state.tags, this.props.tagsOptions[index]]});
        } else {
            const tags = this.state.tags;
            tags.splice(ind, 1);
            this.setState({tags: tags});
        }
    }

    onDoneHandler() {
        this.props.onDone(this.state);
        this.props.onWeChatIdDone(this.state.weChatId);
        this.props.onClose();
    }

    render() {
        return (
            <ModalForm showForm={this.props.showForm}
                       confirmButtonColor={PRIMARY_RED}
                       onDone={this.onDoneHandler}
                       onClose={this.props.onClose}
                       titleIcon={<AccountIcon/>}
                       titleText={'找课友信息'}
            >
                {
                    this.props.showWeChatInput &&
                    <TextInput classNames={'form-input-field'}
                               inputIcon={<WeChatIcon />}
                               label={'微信号'}
                               onChange={this.onWeChatIdChange}
                               value={this.state.weChatId}
                    />
                }
                <MenuInput classNames={'form-input-field'}
                           inputIcon={<MajorIcon viewBox="0 0 18 24.031" color={SECONDARY_RED}/>}
                           label={'专业'}
                           values={this.state.major}
                           onChange={this.onMajorChange}
                           options={this.props.majorOptions}
                           textColor={'white'}
                           tagDisplay={false}
                           tagColor={PRIMARY_RED}
                           multiple={false}
                />
                <MenuInput classNames={'form-input-field'}
                           inputIcon={<CourseIcon viewBox="0 0 22 20" color={SECONDARY_RED}/>}
                           label={'课程'}
                           values={this.state.courses}
                           onChange={this.onCoursesChange}
                           options={this.props.coursesOptions}
                           textColor={'white'}
                           tagColor={PRIMARY_RED}
                           tagDisplay={false}
                           multiple={true}
                />
                <TextInput classNames={'form-input-field'}
                           inputIcon={<MottoIcon viewBox="0 0 32 30" color={SECONDARY_RED}/>}
                           label={'一句话'}
                           onChange={this.onMottoChange}
                           value={this.state.motto}
                />
                <MenuInput classNames={'form-input-field'}
                           inputIcon={<TagIcon viewBox="0 0 32 32" color={SECONDARY_RED}/>}
                           label={'标签'}
                           values={this.state.tags}
                           onChange={this.onTagChange}
                           options={this.props.tagsOptions}
                           tagColor={PRIMARY_RED}
                           textColor={'white'}
                           tagDisplay={true}
                           multiple={true}
                />
            </ModalForm>
        )
    }
}

ClassmatesForm.propTypes = {
    showForm: PropTypes.bool.isRequired,
    // form values:
    major: PropTypes.string.isRequired,
    courses: PropTypes.arrayOf(PropTypes.string).isRequired,
    motto: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    //options
    majorOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
    coursesOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
    tagsOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
    // on done/cancel
    onDone: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    // WeChat Number
    showWeChatInput: PropTypes.bool.isRequired,
    weChatId: PropTypes.string,
    onWeChatIdDone: PropTypes.func
};

export default ClassmatesForm;
