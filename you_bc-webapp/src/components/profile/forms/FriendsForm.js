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
import {chooseItems, isIOS} from "../../../utils/Util";
import {ExceedMaxItemsError} from "../../../utils/Errors";
import {defaultErrorHandler} from "../../../utils/ErrorHandling";

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
            facultyError: '',
            relationshipError: '',
            mottoError: '',
            tagsError: '',
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
    }

    componentWillReceiveProps() {
        const { store } = this.context;
        this.setState({
            weChatId: this.props.weChatId,
            faculty: this.props.friends.faculty,
            relationship: this.props.friends.relationship,
            motto: this.props.friends.motto,
            tags: this.props.friends.tags.slice(0), // make a copy. otherwise we are directly changing store
        });
        getFacultyOptions()
            .then(response => {
                this.setState({facultyOptions: response.data});
            })
            .catch(err=> {
                defaultErrorHandler(err, store.dispatch, "Failed to fetch faculties");
            });
        getRelationshipOptions()
            .then(response => {
                this.setState({relationshipOptions: response.data});
            })
            .catch(err=> {
                defaultErrorHandler(err, store.dispatch, "Failed to fetch relationship options");
            });
        getFriendsTags()
            .then(response => {
                this.setState({tagsOptions: response.data});
            })
            .catch(err=> {
                defaultErrorHandler(err, store.dispatch, "Failed to fetch tags");
            });
    }

    onWeChatIdChange(event, newValue) {
        this.setState({weChatId: newValue})
    }

    onFacultyChange(event, menuItem, index) {
        this.setState({facultyError: ''});
        this.setState({faculty: this.state.facultyOptions[index]});
    }

    onRelationshipChange(event, menuItem, index) {
        this.setState({relationshipError: ''});
        this.setState({relationship: this.state.relationshipOptions[index]});
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
                this.setState({tagsError: `Max: ${tagLimit}`});
            } else {
                throw e; // let others bubble up
            }
        }
    }

    onDoneHandler() {
        if (this.state.weChatId && this.state.faculty && this.state.relationship && this.state.motto && this.state.tags.length) {
            this.props.onDone(this.state);
            this.props.onWeChatIdDone(this.state.weChatId);
            this.props.onClose();
        } else {
            this.setState({
                facultyError: this.state.faculty?'':'Required',
                relationshipError: this.state.relationship?'':'Required',
                mottoError: this.state.motto?'':'Required',
                tagsError: this.state.tags.length?'':'Required',
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
                       confirmButtonColor={PRIMARY_YELLOW}
                       onDone={this.onDoneHandler}
                       onClose={this.props.onClose}
                       titleIcon={<AccountIcon/>}
                       titleText={'Find Friends'}
                       forceMinHeight={true}
            >
                {
                    this.props.showWeChatInput &&
                    <TextInput classNames={'form-input-field'}
                               inputIcon={<WeChatIcon color={PRIMARY_YELLOW} />}
                               label={'WeChat (Required)'}
                               onChange={this.onWeChatIdChange}
                               value={this.state.weChatId}
                               errorText={""}
                    />
                }
                <MenuInput inputIcon={<FacultyIcon/>}
                           label={'Faculty'}
                           values={this.state.faculty}
                           onChange={this.onFacultyChange}
                           options={this.state.facultyOptions}
                           tagColor={PRIMARY_YELLOW}
                           textColor={'white'}
                           tagDisplay={false}
                           multiple={false}
                           errorText={this.state.facultyError}
                />
                <MenuInput inputIcon={<RelationshipIcon color={PRIMARY_YELLOW} />}
                           label={'Relationship Status'}
                           values={this.state.relationship}
                           onChange={this.onRelationshipChange}
                           options={this.state.relationshipOptions}
                           tagColor={PRIMARY_YELLOW}
                           textColor={'white'}
                           tagDisplay={false}
                           multiple={false}
                           errorText={this.state.relationshipError}
                />
                <TextInput classNames={'form-input-field'}
                           inputIcon={<MottoIcon color={PRIMARY_YELLOW}/>}
                           label={'Life Motto'}
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
                           inputIcon={<TagIcon color={PRIMARY_YELLOW}/>}
                           label={'Tags'}
                           values={this.state.tags}
                           onChange={this.onTagChange}
                           options={this.state.tagsOptions}
                           tagColor={PRIMARY_YELLOW}
                           textColor={'white'}
                           tagDisplay={true}
                           multiple={true}
                           errorText={this.state.tagsError}
                />
            </ModalForm>
        )
    }
}

FriendsForm.propTypes = {
    showForm: PropTypes.bool.isRequired,
    //form values/options:
    friends: PropTypes.shape({
        faculty: PropTypes.string.isRequired,
        relationship: PropTypes.string.isRequired,
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

FriendsForm.contextTypes = {
    store: PropTypes.object
};

export default FriendsForm;
