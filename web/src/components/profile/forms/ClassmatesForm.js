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
import SearchableMenuInput from "../../common/form/SearchableMenuInput";
import {fetchCourses} from "../../../actions/profile/profileMenuOptionsFetchActions";
import {getCourseOptions} from "../../../requests/profileOptionRequests";
import {showInfoBar} from "../../../actions/global/globalActions";

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
            showError: false,
            coursesOptions: [],
            loadingCourseOptions: false
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

    onCourseSearchChange(newValue) {
        const { store } = this.context;
        this.setState({loadingCourseOptions: true});
        getCourseOptions(newValue)
            .finally(() => this.setState({loadingCourseOptions: false}))
            .then(response => {
                this.setState({coursesOptions: response.data});
            })
            .catch(err => {
                // TODO: centralize error handling
                store.dispatch(showInfoBar("获取课程选项失败"));
                if (err.response.data.error) {
                    console.log(err.response.data.error);
                }
            });
    }

    onCoursesChange(option) {
        const ind = this.state.courses.indexOf(option);
        if (ind === -1) {
            // TODO: factor out common code to enforce max 3
            // can only choose max 3
            if (this.state.courses.length <3) {
                this.setState({courses: [...this.state.courses, option]});
            } else {
                this.setState({courses: [this.state.courses[1], this.state.courses[2], option]});
            }
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
            // TODO: factor out common code to enforce max 3
            // can only choose max 3
            if (this.state.tags.length <3) {
                this.setState({tags: [...this.state.tags, this.props.classmates.options.tagsOptions[index]]});
            } else {
                this.setState({tags: [this.state.tags[1], this.state.tags[2], this.props.classmates.options.tagsOptions[index]]});
            }
        } else {
            const tags = this.state.tags;
            tags.splice(ind, 1);
            this.setState({tags: tags});
        }
    }

    onDoneHandler() {
        if (this.state.weChatId && this.state.major && this.state.courses.length && this.state.motto && this.state.tags.length) {
            this.props.onDone({
                major: this.state.major,
                courses: this.state.courses,
                motto: this.state.motto,
                tags: this.state.tags,
            });
            this.props.onWeChatIdDone(this.state.weChatId);
            this.setState({coursesOptions: []});
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
                               inputIcon={<WeChatIcon color={PRIMARY_RED} />}
                               label={'微信号(必填)'}
                               onChange={this.onWeChatIdChange}
                               value={this.state.weChatId}
                               errorText={"微信号填写后不可修改，请确认填写正确。（如需修改请联系客服）"}
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
                <SearchableMenuInput classNames={'form-input-field'}
                                     inputIcon={<CourseIcon color={PRIMARY_RED}/>}
                                     label={'课程'}
                                     values={this.state.courses}
                                     onChange={this.onCoursesChange}
                                     handleSearchChange={this.onCourseSearchChange.bind(this)}
                                     options={this.state.coursesOptions}
                                     textColor={'white'}
                                     chipColor={SECONDARY_RED}
                                     tagColor={PRIMARY_RED}
                                     tagDisplay={false}
                                     multiple={true}
                                     loadingOptions={this.state.loadingCourseOptions}
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

ClassmatesForm.contextTypes = {
    store: PropTypes.object
};

export default ClassmatesForm;
