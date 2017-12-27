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
import AgeIcon from 'material-ui/svg-icons/social/cake';
import ConstellationIcon from 'material-ui/svg-icons/image/brightness-3';
//colors
import {PRIMARY_GREEN, SECONDARY_GREEN} from "../../../styles/constants/colors";

class PersonalForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            age: 0,
            constellation: ''
        };

        this.onDoneHandler = this.onDoneHandler.bind(this);
        this.onAgeChangeHandler = this.onAgeChangeHandler.bind(this);
        this.onConstellationChangeHandler = this.onConstellationChangeHandler.bind(this);
    }

    componentWillReceiveProps() {
        this.setState({
            age: this.props.personal.age,
            constellation: this.props.personal.constellation
        });
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
                <TextInput inputIcon={<AgeIcon color={SECONDARY_GREEN} />}
                           label={'年龄'}
                           onChange={this.onAgeChangeHandler}
                           value={this.state.age}
                           type={'number'}
                />
                <MenuInput inputIcon={<ConstellationIcon color={SECONDARY_GREEN} />}
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
};

export default PersonalForm;
