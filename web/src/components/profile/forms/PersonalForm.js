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
//colors
import {PRIMARY_GREEN} from "../../../styles/constants/colors";

class PersonalForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            weChatId: '',
            age: 0,
            constellation: ''
        };
        this.onWeChatIdChange = this.onWeChatIdChange.bind(this);
        this.onDoneHandler = this.onDoneHandler.bind(this);
        this.onAgeChangeHandler = this.onAgeChangeHandler.bind(this);
        this.onConstellationChangeHandler = this.onConstellationChangeHandler.bind(this);
    }

    componentWillReceiveProps() {
        this.setState({
            weChatId: this.props.weChatId,
            age: this.props.personal.age,
            constellation: this.props.personal.constellation
        });
    }

    onWeChatIdChange(event, newValue) {
        this.setState({weChatId: newValue})
    }

    onAgeChangeHandler(event, newValue) {
        this.setState({
            age: Number.parseInt(newValue)
        });
    }

    onConstellationChangeHandler(event, menuItem, index) {
        this.setState({
            constellation: this.props.personalOptions.constellationOptions[index]
        });
    }

    onDoneHandler() {
        this.props.onDone(this.state);
        this.props.onWeChatIdDone(this.state.weChatId);
        this.props.onClose();
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
                               inputIcon={<WeChatIcon />}
                               label={'微信号'}
                               onChange={this.onWeChatIdChange}
                               value={this.state.weChatId}
                    />
                }
                <TextInput inputIcon={<AgeIcon color={PRIMARY_GREEN} />}
                           label={'年龄'}
                           onChange={this.onAgeChangeHandler}
                           value={this.state.age}
                           type={'number'}
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
        constellation: PropTypes.string
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
