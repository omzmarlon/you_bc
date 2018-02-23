'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
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
import {getClassmatesTags, getCourseOptions, getMajorOptions} from "../../../requests/profileOptionRequests";
import {showInfoBar} from "../../../actions/global/globalActions";
import {chooseItems, isIOS} from "../../../utils/Util";
import {ExceedMaxItemsError} from "../../../utils/Errors";

class ClassmatesForm extends React.Component {

    constructor(props) {
        // NOTE: this form does not allow updating options yet. If needed, move props values into states like below
        // onDoneHandler also need to change
        super(props);
        this.state = {
            loadingCourseOptions: false,
            //values
            weChatId: '',
            major: '',
            courses: [],
            motto: '',
            tags: [],
            //error
            majorError: '',
            coursesError: '',
            mottoError: '',
            tagsError: '',
            // options
            coursesOptions: [],
            majorOptions: [],
            tagsOptions: [],

        };
        this.onWeChatIdChange = this.onWeChatIdChange.bind(this);
        this.onDoneHandler = this.onDoneHandler.bind(this);
        this.onMajorChange = this.onMajorChange.bind(this);
        this.onCoursesChange = this.onCoursesChange.bind(this);
        this.onMottoChange = this.onMottoChange.bind(this);
        this.onTagChange = this.onTagChange.bind(this);
    }

    componentWillReceiveProps() {
        const { store } = this.context;
        this.setState({
            weChatId: this.props.weChatId,
            major: this.props.classmates.major,
            courses: this.props.classmates.courses.slice(0), // make a copy. otherwise we are directly changing store
            motto: this.props.classmates.motto,
            tags: this.props.classmates.tags.slice(0), // make a copy. otherwise we are directly changing store
        });
        getMajorOptions()
            .then(response => {
                this.setState({majorOptions: response.data});
            })
            .catch(err => {
                // TODO: centralize error handling
                store.dispatch(showInfoBar("获取专业选项失败"));
                if (err.response.data.error) {
                    console.log(err.response.data.error);
                }
            });
        getClassmatesTags()
            .then(res => {
                this.setState({tagsOptions: res.data});
            })
            .catch(err => {
                // TODO: centralize error handling
                store.dispatch(showInfoBar("获取找课友标签失败"));
                if (err.response.data.error) {
                    console.log(err.response.data.error);
                }
            });

    }

    onWeChatIdChange(event, newValue) {
        this.setState({weChatId: newValue})
    }

    onMajorChange(event, menuItem, index) {
        this.setState({majorError: ''});
        this.setState({major: this.state.majorOptions[index]});
    }

    onCourseSearchChange(newValue) {
        if (newValue) {
            const { store } = this.context;
            this.setState({loadingCourseOptions: true});
            getCourseOptions(newValue)
                .then(response => {
                    this.setState({coursesOptions: response.data});
                    this.setState({loadingCourseOptions: false});
                })
                .catch(err => {
                    // TODO: centralize error handling
                    store.dispatch(showInfoBar("获取课程选项失败"));
                    this.setState({loadingCourseOptions: false});
                    if (err.response.data.error) {
                        console.log(err.response.data.error);
                    }
                });
        }
    }

    onCoursesChange(option) {
        const courseLimit = 10;
        try {
            this.setState({
                courses: chooseItems(option, this.state.courses, courseLimit)
            });
            this.setState({coursesError: ''});
        } catch (e) {
            if (e instanceof ExceedMaxItemsError) {
                this.setState({coursesError: `最多可选${courseLimit}个`});
            } else {
                throw e; // let others bubble up
            }
        }
    }

    onMottoChange(event, newValue) {
        this.setState({mottoError: ''});
        this.setState({motto: newValue})
    }

    onTagChange(event, menuItem, index) {
        const tagLimit = 5;
        try {
            this.setState({
                tags: chooseItems(this.state.tagsOptions[index], this.state.tags, tagLimit)
            });
            this.setState({tagsError: ''});
        } catch (e) {
            if (e instanceof ExceedMaxItemsError) {
                this.setState({tagsError: `最多可选${tagLimit}个`});
            } else {
                throw e; // let others bubble up
            }
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
            this.setState({
                majorError: this.state.major?'':'必填',
                coursesError: this.state.courses.length?'':'必填',
                mottoError: this.state.motto?'':'必填',
                tagsError: this.state.tags.length?'':'必填',
            });
        }
    }

    scrollToMottoInput() {
        if (!isIOS()) {
            const elementOnFocus = ReactDOM.findDOMNode(this.refs.mottoInput);
            if (elementOnFocus && elementOnFocus.scrollIntoView) {
                // needs delay because the scroll may happen before screen squeeze
                setTimeout(() => elementOnFocus.scrollIntoView(), 500);
            }
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
                       forceMinHeight={true}
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
                           options={this.state.majorOptions}
                           textColor={'white'}
                           tagDisplay={false}
                           tagColor={PRIMARY_RED}
                           multiple={false}
                           errorText={this.state.majorError}
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
                                     errorText={this.state.coursesError}
                />
                <TextInput classNames={'form-input-field'}
                           inputIcon={<MottoIcon color={PRIMARY_RED}/>}
                           label={'能力'}
                           onChange={this.onMottoChange}
                           value={this.state.motto}
                           errorText={this.state.mottoError}
                           ref='mottoInput'
                           onFocus={this.scrollToMottoInput.bind(this)}
                           rows={1}
                           rowsMax={4}
                           multiLine={true}
                           wordLimit={100}
                />
                <MenuInput classNames={'form-input-field'}
                           inputIcon={<TagIcon color={PRIMARY_RED}/>}
                           label={'标签'}
                           values={this.state.tags}
                           onChange={this.onTagChange}
                           options={this.state.tagsOptions}
                           tagColor={PRIMARY_RED}
                           textColor={'white'}
                           tagDisplay={true}
                           multiple={true}
                           errorText={this.state.tagsError}
                />
            </ModalForm>
        )
    }
}

ClassmatesForm.propTypes = {
    showForm: PropTypes.bool.isRequired,
    // form values/options:
    classmates: PropTypes.shape({
        major: PropTypes.string.isRequired,
        courses: PropTypes.arrayOf(PropTypes.string).isRequired,
        motto: PropTypes.string.isRequired,
        tags: PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired,

    // on done/cancel
    onDone: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    // WeChat
    showWeChatInput: PropTypes.bool.isRequired,
    weChatId: PropTypes.string,
    onWeChatIdDone: PropTypes.func
};

//TODO: use connect instead
ClassmatesForm.contextTypes = {
    store: PropTypes.object
};

export default ClassmatesForm;
