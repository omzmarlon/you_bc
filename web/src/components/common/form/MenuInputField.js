import React from 'react';
import PropTypes from 'prop-types';
//components
import InfoRow from "../InfoRow";
import Divider from 'material-ui/Divider';
import Tag from "../Tag";
import IconButton from 'material-ui/IconButton';

//icons
import ArrowRightIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
//styles
import "./MenuInputField.less";



class MenuInputField extends React.Component {
    // static component helpers
    static chosenValueComponent(value, index, showTag, bkgColor, textColor) {
        if (showTag) {
            return (
                <Tag classNames={'menu-input-value'}
                     text={value} key={index}
                     bkgColor={bkgColor}
                     textColor={textColor}/>
            )
        } else {
            return (
                <span className={'menu-input-value'} key={index}>
                    {value}
                </span>
            );
        }
    }

    static inputFieldContent(emptyValueChecker, hintLabel, values, tagDisplay, bkgColor, textColor) {
        const flattenValues = [].concat.apply([], [values]); // in case props.values is a single string
        return (
            emptyValueChecker(values) ?
                <div className={'menu-label'}>
                    {hintLabel}
                </div>:
                <div className={'menu-input-values'}>
                    {flattenValues.map(
                        (v, index) => MenuInputField.chosenValueComponent(v, index, tagDisplay, bkgColor, textColor)
                    )}
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

    render() {
        return (
            <InfoRow
                className={`menu-input-container ${this.props.classNames}`}
                leftElement={this.props.inputIcon}
                rightElement={
                    <div className={'menu-container'}
                         onClick={this.props.onClick}
                    >
                        <div className={'menu-content'}>
                            {/*display selected choices*/}
                            {
                                MenuInputField.inputFieldContent(
                                    MenuInputField.getEmptyValueChecker(this.props.multiple),
                                    this.props.label,
                                    this.props.values,
                                    this.props.tagDisplay,
                                    this.props.tagColor,
                                    this.props.textColor
                                )
                            }
                            {/*button to open modal menu*/}
                            <IconButton
                                className={'menu-input-button'}
                                onClick={this.props.onClick}
                            >
                                <ArrowRightIcon/>
                            </IconButton>
                        </div>
                        <Divider/>
                        {
                            this.props.errorText && <span className={"error-text"}>必填</span>
                        }
                    </div>
                }
            />
        );
    }
}

MenuInputField.propTypes = {
    classNames: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    inputIcon: PropTypes.element.isRequired,
    label: PropTypes.string.isRequired,
    multiple: PropTypes.bool.isRequired,
    values: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.string
    ]).isRequired,
    textColor: PropTypes.string.isRequired,
    tagDisplay: PropTypes.bool.isRequired,
    tagColor: PropTypes.string,
    errorText: PropTypes.string
};

export default MenuInputField;
