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
import FacultyIcon from "../../common/svg/FacultyIcon";
import RelationshipIcon from "../../common/svg/RelationshipIcon";
//colors
import {PRIMARY_YELLOW, SECONDARY_YELLOW} from "../../../styles/constants/colors";

class FriendsForm extends React.Component {
    constructor(props) {
        // NOTE: this form does not allow updating options yet. If needed, move props values into states like below
        // onDoneHandler also need to change
        super(props);
        this.state = {
            weChatId: '',
            faculty: '',
            relationship: '',
            motto: '',
            tags: [],
        };
        this.onWeChatIdChange = this.onWeChatIdChange.bind(this);
        this.onDoneHandler = this.onDoneHandler.bind(this);
        this.onFacultyChange = this.onFacultyChange.bind(this);
        this.onRelationshipChange = this.onRelationshipChange.bind(this);
        this.onMottoChange = this.onMottoChange.bind(this);
        this.onTagChange = this.onTagChange.bind(this);
    }

    componentWillReceiveProps() {
        this.setState({
            weChatId: this.props.weChatId,
            faculty: this.props.faculty,
            relationship: this.props.relationship,
            motto: this.props.motto,
            tags: this.props.tags
        });
    }

    onWeChatIdChange(event, newValue) {
        console.log(newValue);
        this.setState({weChatId: newValue})
    }

    onFacultyChange(event, menuItem, index) {
        this.setState({faculty: this.props.facultyOptions[index]});
    }

    onRelationshipChange(event, menuItem, index) {
        this.setState({relationship: this.props.relationshipOptions[index]});
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
                       confirmButtonColor={PRIMARY_YELLOW}
                       onDone={this.onDoneHandler}
                       onClose={this.props.onClose}
                       titleIcon={<AccountIcon/>}
                       titleText={'找_友信息'}
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
                <MenuInput inputIcon={<FacultyIcon/>}
                           label={'学院'}
                           values={this.state.faculty}
                           onChange={this.onFacultyChange}
                           options={this.props.facultyOptions}
                           tagColor={PRIMARY_YELLOW}
                           textColor={'white'}
                           tagDisplay={false}
                           multiple={false}
                />
                <MenuInput inputIcon={<RelationshipIcon viewBox="0 0 20 19" color={SECONDARY_YELLOW} />}
                           label={'情感状况'}
                           values={this.state.relationship}
                           onChange={this.onRelationshipChange}
                           options={this.props.relationshipOptions}
                           tagColor={PRIMARY_YELLOW}
                           textColor={'white'}
                           tagDisplay={false}
                           multiple={false}
                />
                <TextInput classNames={'form-input-field'}
                           inputIcon={<MottoIcon viewBox="0 0 32 30" color={SECONDARY_YELLOW}/>}
                           label={'一句话'}
                           onChange={this.onMottoChange}
                           value={this.state.motto}
                />
                <MenuInput classNames={'form-input-field'}
                           inputIcon={<TagIcon viewBox="0 0 32 32" color={SECONDARY_YELLOW}/>}
                           label={'标签'}
                           values={this.state.tags}
                           onChange={this.onTagChange}
                           options={this.props.tagsOptions}
                           tagColor={PRIMARY_YELLOW}
                           textColor={'white'}
                           tagDisplay={true}
                           multiple={true}
                />
            </ModalForm>
        )
    }
}

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
    // on done/cancel
    onDone: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    // WeChat Number
    showWeChatInput: PropTypes.bool.isRequired,
    weChatId: PropTypes.string,
    onWeChatIdDone: PropTypes.func
};

export default FriendsForm;
