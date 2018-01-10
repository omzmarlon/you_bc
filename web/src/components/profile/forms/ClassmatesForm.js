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
import {PRIMARY_RED} from "../../../styles/constants/colors";

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
            showError: false
        };
        this.onWeChatIdChange = this.onWeChatIdChange.bind(this);
        this.onDoneHandler = this.onDoneHandler.bind(this);
        this.onMajorChange = this.onMajorChange.bind(this);
        this.onCoursesChange = this.onCoursesChange.bind(this);
        this.onMottoChange = this.onMottoChange.bind(this);
        this.onTagChange = this.onTagChange.bind(this);
        this.showError = this.showError.bind(this);
    }

    showError(field) {
        if (this.state.showError) {
            return field.length?'':'必填';
        } else {
            return "";
        }
    }

    componentWillReceiveProps() {
        this.setState({
            weChatId: this.props.weChatId,
            major: this.props.classmates.values.major,
            courses: this.props.classmates.values.courses,
            motto: this.props.classmates.values.motto,
            tags: this.props.classmates.values.tags
        });
    }

    onWeChatIdChange(event, newValue) {
        this.setState({weChatId: newValue})
    }

    onMajorChange(event, menuItem, index) {
        this.setState({major: this.props.classmates.options.majorOptions[index]});
    }

    onCoursesChange(event, menuItem, index) {
        const ind = this.state.courses.indexOf(this.props.classmates.options.coursesOptions[index]);
        if (ind === -1) {
            this.setState({courses: [...this.state.courses, this.props.classmates.options.coursesOptions[index]]});
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
        const ind = this.state.tags.indexOf(this.props.classmates.options.tagsOptions[index]);
        if (ind === -1) {
            this.setState({tags: [...this.state.tags, this.props.classmates.options.tagsOptions[index]]});
        } else {
            const tags = this.state.tags;
            tags.splice(ind, 1);
            this.setState({tags: tags});
        }
    }

    onDoneHandler() {
        if (this.state.weChatId && this.state.major && this.state.courses.length && this.state.motto && this.state.tags.length) {
            this.props.onDone(this.state);
            this.props.onWeChatIdDone(this.state.weChatId);
            this.props.onClose();
        } else {
            this.setState({showError: true});
        }
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
                               errorText={this.showError(this.state.weChatId)}
                    />
                }
                <MenuInput classNames={'form-input-field'}
                           inputIcon={<MajorIcon color={PRIMARY_RED}/>}
                           label={'专业'}
                           values={this.state.major}
                           onChange={this.onMajorChange}
                           options={this.props.classmates.options.majorOptions}
                           textColor={'white'}
                           tagDisplay={false}
                           tagColor={PRIMARY_RED}
                           multiple={false}
                           errorText={this.showError(this.state.major)}
                />
                <MenuInput classNames={'form-input-field'}
                           inputIcon={<CourseIcon color={PRIMARY_RED}/>}
                           label={'课程'}
                           values={this.state.courses}
                           onChange={this.onCoursesChange}
                           options={this.props.classmates.options.coursesOptions}
                           textColor={'white'}
                           tagColor={PRIMARY_RED}
                           tagDisplay={false}
                           multiple={true}
                           errorText={this.showError(this.state.courses)}
                />
                <TextInput classNames={'form-input-field'}
                           inputIcon={<MottoIcon color={PRIMARY_RED}/>}
                           label={'一句话'}
                           onChange={this.onMottoChange}
                           value={this.state.motto}
                           errorText={this.showError(this.state.motto)}
                />
                <MenuInput classNames={'form-input-field'}
                           inputIcon={<TagIcon color={PRIMARY_RED}/>}
                           label={'标签'}
                           values={this.state.tags}
                           onChange={this.onTagChange}
                           options={this.props.classmates.options.tagsOptions}
                           tagColor={PRIMARY_RED}
                           textColor={'white'}
                           tagDisplay={true}
                           multiple={true}
                           errorText={this.showError(this.state.tags)}
                />
            </ModalForm>
        )
    }
}

ClassmatesForm.propTypes = {
    showForm: PropTypes.bool.isRequired,
    // form values/options:
    classmates: PropTypes.shape({
        values: PropTypes.shape({
            major: PropTypes.string.isRequired,
            courses: PropTypes.arrayOf(PropTypes.string).isRequired,
            motto: PropTypes.string.isRequired,
            tags: PropTypes.arrayOf(PropTypes.string).isRequired
        }).isRequired,
        options: PropTypes.shape({
            majorOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
            coursesOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
            tagsOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
        }).isRequired
    }).isRequired,

    // on done/cancel
    onDone: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    // WeChat
    showWeChatInput: PropTypes.bool.isRequired,
    weChatId: PropTypes.string,
    onWeChatIdDone: PropTypes.func
};

export default ClassmatesForm;
