import React from 'react';
import PropTypes from 'prop-types';
//components
import DialogMenu from "../menus/DialogMenu";
import MenuInputField from "./MenuInputField";

class MenuInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };
    }

    // handlers
    onClickMenuButton() {
        this.setState({showModal: !this.state.showModal});
    }


    render() {
        return (
            <div>
                <MenuInputField classNames={this.props.classNames}
                                inputIcon={this.props.inputIcon}
                                label={this.props.label}
                                multiple={this.props.multiple}
                                values={this.props.values}
                                textColor={this.props.textColor}
                                tagDisplay={this.props.tagDisplay}
                                tagColor={this.props.tagColor}
                                errorText={this.props.errorText}
                                onClick={this.onClickMenuButton.bind(this)}
                />
                <DialogMenu showMenu={this.state.showModal}
                            onDone={this.onClickMenuButton.bind(this)}
                            buttonColor={this.props.tagColor}
                            values={this.props.values}
                            onItemClick={this.props.onChange}
                            multiple={this.props.multiple}
                            options={this.props.options}
                            errorText={this.props.errorText}
                />
            </div>
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
    onChange: PropTypes.func.isRequired, // when chosen menu item change
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    textColor: PropTypes.string.isRequired,
    tagDisplay: PropTypes.bool.isRequired,
    multiple: PropTypes.bool.isRequired,
    tagColor: PropTypes.string,
    errorText: PropTypes.string
};

export default MenuInput;
