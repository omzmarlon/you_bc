import React from 'react';
import PropTypes from 'prop-types';
//components
import InfoRow from "../InfoRow";
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import Tag from "../Tag";
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/Menu';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
//icons
import ArrowRightIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
//styles
import "./MenuInput.less";
import {formSize} from '../../../styles/material/formStyles';
//colors
import {PRIMARY_GREEN, SECONDARY_GREEN} from "../../../styles/constants/colors";

const menuTextSize = 55;

const menuItemStyle = {
    fontSize: menuTextSize,
    height: '1.5em',
    marginTop: 25,
    marginBottom: 25,
    display: 'flex',
    alignItems: 'center'
};

const iconStyle = {
    width: 60,
    height: 60,
};

const buttonStyle = {
    width: 120,
    height: 120,
    padding: 30,
};

// 2. Modal menu should be able to display selected values not just as tags but also as plain texts
class MenuInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false
        };

        this.getMenuItems = this.getMenuItems.bind(this);
        this.modalMenu = this.modalMenu.bind(this);
        this.onClickMenuButton = this.onClickMenuButton.bind(this);
        this.modalDialog = this.modalDialog.bind(this);
    }

    // getters
    getMenuItems() {
        return this.props.options.map(
            (c, index) => <MenuItem style={menuItemStyle} key={index} value={c} primaryText={c} />
        );
    }

    // handlers
    onClickMenuButton() {
        this.setState({showModal: !this.state.showModal});
    }

    // component helpers
    chosenValueDisplay(value, index, showTag) {
        if (showTag) {
            return (
                <Tag classNames={'menu-input-value'}
                     fontSize={45} text={value} key={index}
                     bkgColor={PRIMARY_GREEN}
                     textColor={SECONDARY_GREEN}/>
            )
        } else {
            return (
                <span className={'menu-input-value'} key={index}>
                    {value}
                </span>
            );
        }
    }


    modalMenu() {
        return (
            <div className={'menu-container'}>
                <div className={'menu-content'}>
                    {/*diplay selected choices*/}
                    {
                        this.props.values.length === 0 ?
                            <div className={'menu-label'}>
                                {this.props.label}
                            </div>:
                            <div className={'menu-input-values'}>
                                {this.props.values.map(
                                    (v, index) => this.chosenValueDisplay(v, index, this.props.tagDisplay)
                                )}
                            </div>
                    }
                    {/*button to open modal menu*/}
                    <IconButton
                        className={'menu-input-button'}
                        style={buttonStyle}
                        iconStyle={iconStyle}
                        onClick={this.onClickMenuButton}
                    >
                        <ArrowRightIcon/>
                    </IconButton>
                </div>
                <Divider/>
                {this.modalDialog()}
            </div>
        );
    }

    modalDialog() {
        return (
            <Dialog
                open={this.state.showModal}
                actions={[
                    <RaisedButton
                        onClick={this.onClickMenuButton}
                        style={{height: 70, fontSize: 45}}
                        buttonStyle={{height: 70}}
                        backgroundColor={this.props.tagColor}
                        fullWidth={true}
                    >
                        确定
                    </RaisedButton>
                ]}
                autoScrollBodyContent={true}
                contentStyle={formSize}
            >
                <Menu value={this.props.values}
                      multiple={true}
                      onChange={this.props.onChange}
                >
                    {this.getMenuItems()}
                </Menu>
            </Dialog>
        );
    }

    render() {
        return (
            <InfoRow
                className={'menu-input-container'}
                leftElement={this.props.inputIcon}
                rightElement={
                    this.modalMenu()
                }
            />
        );
    }
}

MenuInput.propTypes = {
    inputIcon: PropTypes.element.isRequired,
    label: PropTypes.string.isRequired,
    values: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    textColor: PropTypes.string.isRequired,
    tagDisplay: PropTypes.bool.isRequired,
    tagColor: PropTypes.string
};

export default MenuInput;
