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
import {getHometownOptions, getLocationsOptions, getRoommatesTags} from "../../../requests/profileOptionRequests";
import {showInfoBar} from "../../../actions/global/globalActions";
import {chooseItems, isIOS} from "../../../utils/Util";
import {ExceedMaxItemsError} from "../../../utils/Errors";
import {defaultErrorHandler} from "../../../utils/ErrorHandling";

class RoommatesForm extends React.Component {
    constructor(props) {
        // NOTE: this form does not allow updating options yet. If needed, move props values into states like below
        // onDoneHandler also need to change
        super(props);
        this.state = {
            //values
            weChatId: '',
            location: '',
            hometown: '',
            motto: '',
            tags: [],
            //error
            //error
            locationError: '',
            hometownError: '',
            mottoError: '',
            tagsError: '',
            //options
            locationOptions: [],
            hometownOptions: [],
            tagsOptions: []
        };
        this.onWeChatIdChange = this.onWeChatIdChange.bind(this);
        this.onDoneHandler = this.onDoneHandler.bind(this);
        this.onLocationChange = this.onLocationChange.bind(this);
        this.onHometownChange = this.onHometownChange.bind(this);
        this.onMottoChange = this.onMottoChange.bind(this);
        this.onTagChange = this.onTagChange.bind(this);
    }

    componentWillReceiveProps() {
        const { store } = this.context;
        this.setState({
            weChatId: this.props.weChatId,
            location: this.props.roommates.location,
            hometown: this.props.roommates.hometown,
            motto: this.props.roommates.motto,
            tags: this.props.roommates.tags.slice(0), // make a copy. otherwise we are directly changing store
        });
        getLocationsOptions()
            .then(response => {
                this.setState({locationOptions: response.data});
            })
            .catch(err => {
                defaultErrorHandler(err, store.dispatch, "Fetching Location Failed");
            });
        getHometownOptions()
            .then(response => {
                this.setState({hometownOptions: response.data});
            })
            .catch(err => {
                defaultErrorHandler(err, store.dispatch, "Fetching Hometown Failed");
            });
        getRoommatesTags()
            .then(response => {
                this.setState({
                    tagsOptions: response.data
                });
            })
            .catch(err=> {
                defaultErrorHandler(err, store.dispatch, "Fetching Roommates Failed");
            });

    }

    onWeChatIdChange(event, newValue) {
        this.setState({weChatId: newValue});
    }

    onLocationChange(event, menuItem, index) {
        this.setState({locationError: ''});
        this.setState({location: this.state.locationOptions[index]})
    }

    onHometownChange(event, menuItem, index) {
        this.setState({hometownError: ''});
        this.setState({hometown: this.state.hometownOptions[index]})
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
        if (this.state.weChatId && this.state.location && this.state.hometown && this.state.motto && this.state.tags.length) {
            this.props.onDone(this.state);
            this.props.onWeChatIdDone(this.state.weChatId);
            this.props.onClose();
        } else {
            this.setState({
                locationError: this.state.location?'':'Required',
                hometownError: this.state.hometown?'':'Required',
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
            <ModalForm
                showForm={this.props.showForm}
                confirmButtonColor={PRIMARY_BLUE}
                onDone={this.onDoneHandler}
                onClose={this.props.onClose}
                titleIcon={<AccountIcon />}
                titleText={'Roommates Info'}
                forceMinHeight={true}
            >
                {
                    this.props.showWeChatInput &&
                    <TextInput classNames={'form-input-field'}
                               inputIcon={<WeChatIcon color={PRIMARY_BLUE} />}
                               label={'WeChat(Required)'}
                               onChange={this.onWeChatIdChange}
                               value={this.state.weChatId}
                               errorText={""}
                    />
                }
                <MenuInput classNames={'form-input-field'}
                           inputIcon={<LocationIcon color={PRIMARY_BLUE}/>}
                           label={'Location'}
                           values={this.state.location}
                           onChange={this.onLocationChange}
                           options={this.state.locationOptions}
                           textColor={'white'}
                           tagDisplay={false}
                           tagColor={PRIMARY_BLUE}
                           multiple={false}
                           errorText={this.state.locationError}
                />
                <MenuInput classNames={'form-input-field'}
                           inputIcon={<HometownIcon color={PRIMARY_BLUE}/>}
                           label={'Hometown'}
                           values={this.state.hometown}
                           onChange={this.onHometownChange}
                           options={this.state.hometownOptions}
                           textColor={'white'}
                           tagDisplay={false}
                           tagColor={PRIMARY_BLUE}
                           multiple={false}
                           errorText={this.state.hometownError}
                />
                <TextInput classNames={'form-input-field'}
                           inputIcon={<MottoIcon color={PRIMARY_BLUE}/>}
                           label={'About Me'}
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
                           inputIcon={<TagIcon color={PRIMARY_BLUE}/>}
                           label={'Tags'}
                           values={this.state.tags}
                           onChange={this.onTagChange}
                           options={this.state.tagsOptions}
                           tagColor={PRIMARY_BLUE}
                           textColor={'white'}
                           tagDisplay={true}
                           multiple={true}
                           errorText={this.state.tagsError}
                />
            </ModalForm>
        )
    }
}

RoommatesForm.propTypes = {
    showForm: PropTypes.bool.isRequired,
    // form values/options:
    roommates: PropTypes.shape({
        location: PropTypes.string.isRequired,
        hometown: PropTypes.string.isRequired,
        motto: PropTypes.string.isRequired,
        tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,

    // on done/cancel
    onDone: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    // WeChat
    showWeChatInput: PropTypes.bool.isRequired,
    weChatId: PropTypes.string,
    onWeChatIdDone: PropTypes.func
};

RoommatesForm.contextTypes = {
    store: PropTypes.object
};

export default RoommatesForm;
