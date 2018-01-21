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
import AgeIcon from 'material-ui/svg-icons/social/cake';
import ConstellationIcon from 'material-ui/svg-icons/image/brightness-3';
import MixGenderIcon from "../../common/svg/MixGenderIcon";
//colors
import {PRIMARY_GREEN} from "../../../styles/constants/colors";

const sexOptions = ['男', '女'];

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

    render() {
        return (
            <ModalForm showForm={this.props.showForm}
                       confirmButtonColor={PRIMARY_GREEN}
                       onDone={this.onDoneHandler}
                       onClose={this.props.onClose}
                       titleIcon={<AccountIcon />}
                       titleText={'个人信息'}
            >
                {
                    this.props.showWeChatInput &&
                    <TextInput classNames={'form-input-field'}
                               inputIcon={<WeChatIcon color={PRIMARY_GREEN} />}
                               label={'微信号'}
                               onChange={this.onWeChatIdChange}
                               value={this.state.weChatId}
                               errorText={this.showError(this.state.weChatId)}
                    />
                }
                <TextInput inputIcon={<AccountIcon color={PRIMARY_GREEN}/>}
                           label={'昵称'}
                           onChange={this.onUsernameChangeHandler.bind(this)}
                           value={this.state.username}
                           errorText={this.showError(this.state.username)}
                />
                <MenuInput inputIcon={<MixGenderIcon color={PRIMARY_GREEN}/>}
                           label={'性别'}
                           values={this.state.sex}
                           onChange={this.onSexChangeHandler.bind(this)}
                           options={sexOptions}
                           textColor={'white'}
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
                />
                <MenuInput inputIcon={<ConstellationIcon color={PRIMARY_GREEN} />}
                           label={'星座'}
                           values={this.state.constellation}
                           onChange={this.onConstellationChangeHandler}
                           options={this.props.personalOptions.constellationOptions}
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
    //options
    personalOptions: PropTypes.shape({
        constellationOptions: PropTypes.arrayOf(PropTypes.string)
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
