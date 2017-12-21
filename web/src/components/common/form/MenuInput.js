import React from 'react';
import PropTypes from 'prop-types';
//components
import InfoRow from "../InfoRow";
import Divider from 'material-ui/Divider';
import DropDownMenu from 'material-ui/DropDownMenu';
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

/**
 * Assumes 1. options are unique strings 2. values is a subset of options
 * */

class MenuInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false
        };

        this.getMenuItems = this.getMenuItems.bind(this);
        this.getValues = this.getValues.bind(this);
        this.dropDownMenu = this.dropDownMenu.bind(this);
        this.modalMenu = this.modalMenu.bind(this);
        this.onClickMenuButton = this.onClickMenuButton.bind(this);
        this.modalDialog = this.modalDialog.bind(this);
    }

    // getters
    getMenuItems() {
        return this.props.options.map(
            c => <MenuItem style={menuItemStyle} key={c} value={c} primaryText={c} />
        );
    }

    getValues() {
        if (this.props.config.multiple) {
            return this.props.values;
        } else {
            // if array is empty, auto return undefined
            return this.props.values[0];
        }
    }

    // handlers
    onClickMenuButton() {
        this.setState({showModal: !this.state.showModal});
    }

    // component helpers
    dropDownMenu() {
        return (
            <DropDownMenu
                value={this.getValues()}
                multiple={this.props.config.multiple}
                onChange={this.props.onChange}
                autoWidth={false}
                maxHeight={900}
                style={{width: '100%', fontSize: menuTextSize}}
                underlineStyle={{position: 'relative'}}
            >
                {this.getMenuItems()}
            </DropDownMenu>
        );
    }

    modalMenu() {
        return (
            <div className={'menu-container'}>
                <div className={'menu-content'}>
                    <div className={'menu-input-values'}>
                        {this.getValues().map(
                            v => <Tag classNames={'menu-input-value'}
                                      fontSize={45} text={v} key={v}
                                      bkgColor={PRIMARY_GREEN}
                                      textColor={SECONDARY_GREEN}/>
                        )}
                    </div>
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
                <Menu value={this.getValues()}
                      multiple={this.props.config.multiple}
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
                    this.props.config.modalMenu ? this.modalMenu() : this.dropDownMenu()
                }
            />
        );
    }
}

MenuInput.propTypes = {
    inputIcon: PropTypes.element.isRequired,
    values: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    tagColor: PropTypes.string.isRequired,
    textColor: PropTypes.string.isRequired,
    config: PropTypes.shape({
        modalMenu: PropTypes.bool,
        multiple: PropTypes.bool
    })
};

MenuInput.defaultProps = {
    tagColor: PRIMARY_GREEN,
    textColor: SECONDARY_GREEN,
    config: {
        modalMenu: false,
        multiple: false
    }
};

export default MenuInput;
