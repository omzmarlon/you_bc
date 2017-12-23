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

const menuTextSize = 14;

const menuItemStyle = {
    fontSize: menuTextSize,
    height: '1.5em',
    marginTop: 20,
    marginBottom: 20,
    display: 'flex',
    alignItems: 'center'
};

const iconStyle = {
    width: 36,
    height: 36,
};

class MenuInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false
        };
        this.onClickMenuButton = this.onClickMenuButton.bind(this);
        this.menuDialogHelper = this.menuDialogHelper.bind(this);
    }

    // handlers
    onClickMenuButton() {
        this.setState({showModal: !this.state.showModal});
    }

    // static component helpers
    static menuItems(options) {
        return options.map(
            (c, index) => <MenuItem style={menuItemStyle} key={index} value={c} primaryText={c} />
        );
    }

    static chosenValueComponent(value, index, showTag) {
        if (showTag) {
            return (
                <Tag classNames={'menu-input-value'}
                     fontSize={14} text={value} key={index}
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

    static inputFieldContent(emptyValueChecker, label, values, tagDisplay) {
        const flattenValues = [].concat.apply([], [values]); // in case props.values is a single string
        return (
            emptyValueChecker(values) ?
                <div className={'menu-label'}>
                    {label}
                </div>:
                <div className={'menu-input-values'}>
                    {flattenValues.map((v, index) => MenuInput.chosenValueComponent(v, index, tagDisplay))}
                </div>
        );
    }

    static getEmptyValueChecker(isMultiple) {
        return (
            isMultiple ?
                ((values) => values.length === 0 || values === undefined || values === null):
                ((values) => values === '' || values === undefined || values === null)
        );
    }

    // instance component helper
    menuDialogHelper() {
        return (
            <Dialog
                open={this.state.showModal}
                actions={[
                    <RaisedButton
                        onClick={this.onClickMenuButton}
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
                    {MenuInput.menuItems(this.props.options)}
                </Menu>
            </Dialog>
        );
    }

    render() {
        return (
            <InfoRow
                className={`menu-input-container ${this.props.classNames}`}
                leftElement={this.props.inputIcon}
                rightElement={
                    <div className={'menu-container'}>
                        <div className={'menu-content'}>
                            {/*display selected choices*/}
                            {
                                MenuInput.inputFieldContent(
                                    MenuInput.getEmptyValueChecker(this.props.multiple),
                                    this.props.label,
                                    this.props.values,
                                    this.props.tagDisplay
                                )
                            }
                            {/*button to open modal menu*/}
                            <IconButton
                                className={'menu-input-button'}
                                iconStyle={iconStyle}
                                onClick={this.onClickMenuButton}
                            >
                                <ArrowRightIcon/>
                            </IconButton>
                        </div>
                        <Divider/>
                        {this.menuDialogHelper()}
                    </div>
                }
            />
        );
    }
}

MenuInput.propTypes = {
    classNames: PropTypes.string,
    inputIcon: PropTypes.element.isRequired,
    label: PropTypes.string.isRequired,
    values: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.string
    ]).isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    textColor: PropTypes.string.isRequired,
    tagDisplay: PropTypes.bool.isRequired,
    multiple: PropTypes.bool.isRequired,
    tagColor: PropTypes.string
};

export default MenuInput;
