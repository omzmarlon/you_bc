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
import AgeIcon from 'material-ui/svg-icons/social/cake';
import ConstellationIcon from 'material-ui/svg-icons/image/brightness-3';
import MixGenderIcon from "../../common/svg/MixGenderIcon";
//colors
import {PRIMARY_GREEN} from "../../../styles/constants/colors";

const sexOptions = ['男', '女'];
const horoscopeOptions = ["天蝎座", "水瓶座", "狮子座", "白羊座", "摩羯座", "巨蟹座", "天秤座", "金牛座", "双子座", "处女座", "双鱼座", "射手座"];

class PersonalForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            sex: '',
            weChatId: '',
            age: 0,
            constellation: '',
            showError: false
        };
        this.onWeChatIdChange = this.onWeChatIdChange.bind(this);
        this.onDoneHandler = this.onDoneHandler.bind(this);
        this.onAgeChangeHandler = this.onAgeChangeHandler.bind(this);
        this.onConstellationChangeHandler = this.onConstellationChangeHandler.bind(this);
        this.showError = this.showError.bind(this);
    }

    showError(field) {
        if (this.state.showError) {
            return field?'':'必填';
        } else {
            return "";
        }
    }

    componentWillReceiveProps() {
        this.setState({
            weChatId: this.props.weChatId,
            age: this.props.personal.age,
            constellation: this.props.personal.constellation,
            username: this.props.personal.username,
            sex: this.props.personal.sex,
        });
    }

    onWeChatIdChange(event, newValue) {
        this.setState({weChatId: newValue})
    }

    onUsernameChangeHandler(event, newValue) {
        this.setState({
            username: newValue
        });
    }

    onAgeChangeHandler(event, newValue) {
        this.setState({
            age: Number.parseInt(newValue)
        });
    }

    onSexChangeHandler(event, menuItem, index) {
        this.setState({
            sex: sexOptions[index]
        });
    }

    onConstellationChangeHandler(event, menuItem, index) {
        this.setState({
            constellation: this.props.personalOptions.constellationOptions[index]
        });
    }

    onDoneHandler() {
        if (this.state.weChatId && this.state.age && this.state.constellation) {
            this.props.onDone({
                age: this.state.age,
                constellation: this.state.constellation,
                username: this.state.username,
                sex: this.state.sex,
            });
            this.props.onWeChatIdDone(this.state.weChatId);
            this.props.onClose();
        } else {
            this.setState({showError: true});
        }
    }

    scrollToUsernameInput() {
        const elementOnFocus = ReactDOM.findDOMNode(this.refs.usernameInput);
        if (elementOnFocus && elementOnFocus.scrollIntoView) {
            // needs delay because the scroll may happen before screen squeeze
            setTimeout(() => elementOnFocus.scrollIntoView(), 500);
        }
    }

    scrollToAgeInput() {
        const elementOnFocus = ReactDOM.findDOMNode(this.refs.ageInput);
        if (elementOnFocus && elementOnFocus.scrollIntoView) {
            // needs delay because the scroll may happen before screen squeeze
            setTimeout(() => elementOnFocus.scrollIntoView(), 500);
        }
    }

    render() {
        return (
            <ModalForm showForm={this.props.showForm}
                       confirmButtonColor={PRIMARY_GREEN}
                       onDone={this.onDoneHandler}
                       onClose={this.props.onClose}
                       titleIcon={<AccountIcon />}
                       titleText={'个人信息'}
                       forceMinHeight={true}
            >
                {
                    this.props.showWeChatInput &&
                    <TextInput classNames={'form-input-field'}
                               inputIcon={<WeChatIcon color={PRIMARY_GREEN} />}
                               label={'微信号(必填)'}
                               onChange={this.onWeChatIdChange}
                               value={this.state.weChatId}
                               errorText={"微信号填写后不可修改，请确认填写正确。（如需修改请联系客服）"}
                    />
                }
                <TextInput inputIcon={<AccountIcon color={PRIMARY_GREEN}/>}
                           label={'昵称'}
                           onChange={this.onUsernameChangeHandler.bind(this)}
                           value={this.state.username}
                           errorText={this.showError(this.state.username)}
                           ref='usernameInput'
                           onFocus={this.scrollToUsernameInput.bind(this)}
                />
                <MenuInput inputIcon={<MixGenderIcon color={PRIMARY_GREEN}/>}
                           label={'性别'}
                           values={this.state.sex}
                           onChange={this.onSexChangeHandler.bind(this)}
                           options={sexOptions}
                           textColor={'white'}
                           tagColor={PRIMARY_GREEN}
                           tagDisplay={false}
                           multiple={false}
                           errorText={this.showError(this.state.sex)}
                />
                <TextInput inputIcon={<AgeIcon color={PRIMARY_GREEN} />}
                           label={'年龄'}
                           onChange={this.onAgeChangeHandler}
                           value={this.state.age}
                           type={'number'}
                           errorText={this.showError(this.state.age)}
                           ref='ageInput'
                           onFocus={this.scrollToAgeInput.bind(this)}
                />
                <MenuInput inputIcon={<ConstellationIcon color={PRIMARY_GREEN} />}
                           label={'星座'}
                           values={this.state.constellation}
                           onChange={this.onConstellationChangeHandler}
                           options={horoscopeOptions}
                           textColor={'white'}
                           tagColor={PRIMARY_GREEN}
                           tagDisplay={false}
                           multiple={false}
                           errorText={this.showError(this.state.constellation)}
                />
            </ModalForm>
        );
    }
}

PersonalForm.propTypes = {
    showForm: PropTypes.bool.isRequired,
    // form values:
    personal: PropTypes.shape({
        age: PropTypes.number,
        constellation: PropTypes.string,
        username: PropTypes.string,
        sex: PropTypes.string,
    }).isRequired,
    // on done/cancel
    onDone: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    // WeChat
    showWeChatInput: PropTypes.bool.isRequired,
    weChatId: PropTypes.string,
    onWeChatIdDone: PropTypes.func
};

export default PersonalForm;
