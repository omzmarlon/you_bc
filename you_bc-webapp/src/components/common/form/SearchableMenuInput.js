import React from 'react';
import PropTypes from 'prop-types';
//components
import SearchableDialogMenu from "../menus/SearchableDialogMenu";
import MenuInputField from "./MenuInputField";

class SearchableMenuInput extends React.Component {
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

                <SearchableDialogMenu handleSearchChange={this.props.handleSearchChange}
                                      showMenu={this.state.showModal}
                                      onDone={this.onClickMenuButton.bind(this)}
                                      buttonColor={this.props.tagColor}
                                      chipColor={this.props.chipColor}
                                      values={this.props.values}
                                      onChoiceChange={this.props.onChange}
                                      multiple={this.props.multiple}
                                      options={this.props.options}
                                      loadingOptions={this.props.loadingOptions}
                                      errorText={this.props.errorText}
                />
            </div>
        );
    }
}

SearchableMenuInput.propTypes = {
    classNames: PropTypes.string,
    inputIcon: PropTypes.element.isRequired,
    label: PropTypes.string.isRequired,
    values: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.string
    ]).isRequired,
    onChange: PropTypes.func.isRequired, // when chosen menu item change
    handleSearchChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    textColor: PropTypes.string.isRequired,
    chipColor: PropTypes.string.isRequired,
    tagDisplay: PropTypes.bool.isRequired,
    multiple: PropTypes.bool.isRequired,
    tagColor: PropTypes.string,
    errorText: PropTypes.string,
    loadingOptions: PropTypes.bool.isRequired
};

SearchableMenuInput.defaultProps = {
    loadingOptions: false
};


export default SearchableMenuInput;