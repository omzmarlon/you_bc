'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
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
import FacultyIcon from "../../common/svg/FacultyIcon";
import RelationshipIcon from "../../common/svg/RelationshipIcon";
//colors
import {PRIMARY_YELLOW} from "../../../styles/constants/colors";
import {getFacultyOptions, getFriendsTags, getRelationshipOptions} from "../../../requests/profileOptionRequests";
import {showInfoBar} from "../../../actions/global/globalActions";

class FriendsForm extends React.Component {
    constructor(props) {
        // NOTE: this form does not allow updating options yet. If needed, move props values into states like below
        // onDoneHandler also need to change
        super(props);
        this.state = {
            //values
            weChatId: '',
            faculty: '',
            relationship: '',
            motto: '',
            tags: [],
            // errors
            showError: false,
            // options
            facultyOptions: [],
            relationshipOptions: [],
            tagsOptions: []
        };
        this.onWeChatIdChange = this.onWeChatIdChange.bind(this);
        this.onDoneHandler = this.onDoneHandler.bind(this);
        this.onFacultyChange = this.onFacultyChange.bind(this);
        this.onRelationshipChange = this.onRelationshipChange.bind(this);
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
        const { store } = this.context;
        this.setState({
            weChatId: this.props.weChatId,
            faculty: this.props.friends.values.faculty,
            relationship: this.props.friends.values.relationship,
            motto: this.props.friends.values.motto,
            tags: this.props.friends.values.tags
        });
        getFacultyOptions()
            .then(response => {
                this.setState({facultyOptions: response.data});
            })
            .catch(err=> {
                // TODO: centralize error handling
                store.dispatch(showInfoBar("获取学院信息失败"));
                if (err.response.data.error) {
                    console.log(err.response.data.error);
                }
            });
        getRelationshipOptions()
            .then(response => {
                this.setState({relationshipOptions: response.data});
            })
            .catch(err=> {
                store.dispatch(showInfoBar("获取情感选项失败"));
                if (err.response.data.error) {
                    console.log(err.response.data.error);
                }
            });
        getFriendsTags()
            .then(response => {
                this.setState({tagsOptions: response.data});
            })
            .catch(err=> {
                store.dispatch(showInfoBar("获取情感选项失败"));
                if (err.response.data.error) {
                    console.log(err.response.data.error);
                }
            });
    }

    onWeChatIdChange(event, newValue) {
        this.setState({weChatId: newValue})
    }

    onFacultyChange(event, menuItem, index) {
        this.setState({faculty: this.props.friends.options.facultyOptions[index]});
    }

    onRelationshipChange(event, menuItem, index) {
        this.setState({relationship: this.props.friends.options.relationshipOptions[index]});
    }

    onMottoChange(event, newValue) {
        this.setState({motto: newValue})
    }

    onTagChange(event, menuItem, index) {
        const ind = this.state.tags.indexOf(this.props.friends.options.tagsOptions[index]);
        if (ind === -1) {
            // TODO: factor out common code to enforce max 3
            // can only choose max 3
            if (this.state.tags.length <3) {
                this.setState({tags: [...this.state.tags, this.props.friends.options.tagsOptions[index]]});
            } else {
                this.setState({tags: [this.state.tags[1], this.state.tags[2], this.props.friends.options.tagsOptions[index]]});
            }
        } else {
            const tags = this.state.tags;
            tags.splice(ind, 1);
            this.setState({tags: tags});
        }
    }

    onDoneHandler() {
        if (this.state.weChatId && this.state.faculty && this.state.relationship && this.state.motto && this.state.tags.length) {
            // TODO: don't throw the entire state in
            this.props.onDone(this.state);
            this.props.onWeChatIdDone(this.state.weChatId);
            this.props.onClose();
        } else {
            this.setState({showError: true});
        }
    }

    scrollToMottoInput() {
        const elementOnFocus = ReactDOM.findDOMNode(this.refs.mottoInput);
        if (elementOnFocus && elementOnFocus.scrollIntoView) {
            // needs delay because the scroll may happen before screen squeeze
            setTimeout(() => elementOnFocus.scrollIntoView(), 500);
        }
    }

    render() {
        return (
            <ModalForm showForm={this.props.showForm}
                       confirmButtonColor={PRIMARY_YELLOW}
                       onDone={this.onDoneHandler}
                       onClose={this.props.onClose}
                       titleIcon={<AccountIcon/>}
                       titleText={'找朋友信息'}
                       forceMinHeight={true}
            >
                {
                    this.props.showWeChatInput &&
                    <TextInput classNames={'form-input-field'}
                               inputIcon={<WeChatIcon color={PRIMARY_YELLOW} />}
                               label={'微信号(必填)'}
                               onChange={this.onWeChatIdChange}
                               value={this.state.weChatId}
                               errorText={"微信号填写后不可修改，请确认填写正确。（如需修改请联系客服）"}
                    />
                }
                <MenuInput inputIcon={<FacultyIcon/>}
                           label={'学院'}
                           values={this.state.faculty}
                           onChange={this.onFacultyChange}
                           options={this.state.facultyOptions}
                           tagColor={PRIMARY_YELLOW}
                           textColor={'white'}
                           tagDisplay={false}
                           multiple={false}
                           errorText={this.showError(this.state.faculty)}
                />
                <MenuInput inputIcon={<RelationshipIcon color={PRIMARY_YELLOW} />}
                           label={'情感状况'}
                           values={this.state.relationship}
                           onChange={this.onRelationshipChange}
                           options={this.state.relationshipOptions}
                           tagColor={PRIMARY_YELLOW}
                           textColor={'white'}
                           tagDisplay={false}
                           multiple={false}
                           errorText={this.showError(this.state.relationship)}
                />
                <TextInput classNames={'form-input-field'}
                           inputIcon={<MottoIcon color={PRIMARY_YELLOW}/>}
                           label={'一句话'}
                           onChange={this.onMottoChange}
                           value={this.state.motto}
                           errorText={this.showError(this.state.motto)}
                           ref='mottoInput'
                           onFocus={this.scrollToMottoInput.bind(this)}
                />
                <MenuInput classNames={'form-input-field'}
                           inputIcon={<TagIcon color={PRIMARY_YELLOW}/>}
                           label={'标签'}
                           values={this.state.tags}
                           onChange={this.onTagChange}
                           options={this.state.tagsOptions}
                           tagColor={PRIMARY_YELLOW}
                           textColor={'white'}
                           tagDisplay={true}
                           multiple={true}
                           errorText={this.showError(this.state.tags)}
                />
            </ModalForm>
        )
    }
}

FriendsForm.propTypes = {
    showForm: PropTypes.bool.isRequired,
    //form values/options:
    friends: PropTypes.shape({
        values: PropTypes.shape({
            faculty: PropTypes.string.isRequired,
            relationship: PropTypes.string.isRequired,
            motto: PropTypes.string.isRequired,
            tags: PropTypes.arrayOf(PropTypes.string).isRequired
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

FriendsForm.contextTypes = {
    store: PropTypes.object
};

export default FriendsForm;
