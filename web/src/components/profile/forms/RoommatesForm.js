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
import HometownIcon from "../../common/svg/HometownIcon";
import LocationIcon from "../../common/svg/LocationIcon";
import MottoIcon from "../../common/svg/MottoIcon";
import TagIcon from "../../common/svg/TagIcon";
//colors
import {PRIMARY_BLUE} from "../../../styles/constants/colors";

class RoommatesForm extends React.Component {
    constructor(props) {
        // NOTE: this form does not allow updating options yet. If needed, move props values into states like below
        // onDoneHandler also need to change
        super(props);
        this.state = {
            weChatId: '',
            location: '',
            hometown: '',
            motto: '',
            tags: [],
            showError: false
        };
        this.onWeChatIdChange = this.onWeChatIdChange.bind(this);
        this.onDoneHandler = this.onDoneHandler.bind(this);
        this.onLocationChange = this.onLocationChange.bind(this);
        this.onHometownChange = this.onHometownChange.bind(this);
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
            location: this.props.roommates.values.location,
            hometown: this.props.roommates.values.hometown,
            motto: this.props.roommates.values.motto,
            tags: this.props.roommates.values.tags,
        });
    }

    onWeChatIdChange(event, newValue) {
        this.setState({weChatId: newValue});
    }

    onLocationChange(event, menuItem, index) {
        this.setState({location: this.props.roommates.options.locationOptions[index]})
    }

    onHometownChange(event, menuItem, index) {
        this.setState({hometown: this.props.roommates.options.hometownOptions[index]})
    }

    onMottoChange(event, newValue) {
        this.setState({motto: newValue})
    }

    onTagChange(event, menuItem, index) {
        const ind = this.state.tags.indexOf(this.props.roommates.options.tagsOptions[index]);
        if (ind === -1) {
            // TODO: factor out common code to enforce max 3
            // can only choose max 3
            if (this.state.tags.length <3) {
                this.setState({tags: [...this.state.tags, this.props.roommates.options.tagsOptions[index]]});
            } else {
                this.setState({tags: [this.state.tags[1], this.state.tags[2], this.props.roommates.options.tagsOptions[index]]});
            }
        } else {
            const tags = this.state.tags;
            tags.splice(ind, 1);
            this.setState({tags: tags});
        }
    }

    onDoneHandler() {
        if (this.state.weChatId && this.state.location && this.state.hometown && this.state.motto && this.state.tags.length) {
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
            <ModalForm
                showForm={this.props.showForm}
                confirmButtonColor={PRIMARY_BLUE}
                onDone={this.onDoneHandler}
                onClose={this.props.onClose}
                titleIcon={<AccountIcon />}
                titleText={'找室友信息'}
            >
                {
                    this.props.showWeChatInput &&
                    <TextInput classNames={'form-input-field'}
                               inputIcon={<WeChatIcon color={PRIMARY_BLUE} />}
                               label={'微信号(必填)'}
                               onChange={this.onWeChatIdChange}
                               value={this.state.weChatId}
                               errorText={"微信号填写后不可修改，请确认填写正确。（如需修改请联系客服）"}
                    />
                }
                <MenuInput classNames={'form-input-field'}
                           inputIcon={<LocationIcon color={PRIMARY_BLUE}/>}
                           label={'地点'}
                           values={this.state.location}
                           onChange={this.onLocationChange}
                           options={this.props.roommates.options.locationOptions}
                           textColor={'white'}
                           tagDisplay={false}
                           tagColor={PRIMARY_BLUE}
                           multiple={false}
                           errorText={this.showError(this.state.location)}
                />
                <MenuInput classNames={'form-input-field'}
                           inputIcon={<HometownIcon color={PRIMARY_BLUE}/>}
                           label={'家乡'}
                           values={this.state.hometown}
                           onChange={this.onHometownChange}
                           options={this.props.roommates.options.hometownOptions}
                           textColor={'white'}
                           tagDisplay={false}
                           tagColor={PRIMARY_BLUE}
                           multiple={false}
                           errorText={this.showError(this.state.hometown)}
                />
                <TextInput classNames={'form-input-field'}
                           inputIcon={<MottoIcon color={PRIMARY_BLUE}/>}
                           label={'一句话'}
                           onChange={this.onMottoChange}
                           value={this.state.motto}
                           errorText={this.showError(this.state.motto)}
                           ref='mottoInput'
                           onFocus={this.scrollToMottoInput.bind(this)}
                />
                <MenuInput classNames={'form-input-field'}
                           inputIcon={<TagIcon color={PRIMARY_BLUE}/>}
                           label={'标签'}
                           values={this.state.tags}
                           onChange={this.onTagChange}
                           options={this.props.roommates.options.tagsOptions}
                           tagColor={PRIMARY_BLUE}
                           textColor={'white'}
                           tagDisplay={true}
                           multiple={true}
                           errorText={this.showError(this.state.tags)}
                />
            </ModalForm>
        )
    }
}

RoommatesForm.propTypes = {
    showForm: PropTypes.bool.isRequired,
    // form values/options:
    roommates: PropTypes.shape({
        values: PropTypes.shape({
            location: PropTypes.string.isRequired,
            hometown: PropTypes.string.isRequired,
            motto: PropTypes.string.isRequired,
            tags: PropTypes.arrayOf(PropTypes.string).isRequired,
        }).isRequired,
        options: PropTypes.shape({
            locationOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
            hometownOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
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

export default RoommatesForm;
