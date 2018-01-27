import React from 'react';
import PropTypes from 'prop-types';
// components
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

//icons
import SearchIcon from 'material-ui/svg-icons/action/search';

//styles
import {formSize} from '../../../styles/material/formStyles';
import TextInput from "../form/TextInput";

class SearchableDialogMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: ''
        };
    }

    onSearchChange(event, newValue) {
        this.setState({searchText: newValue});
        this.props.handleSearchChange(event, newValue);
    }

    render() {
        return (
            <Dialog
                open={this.props.showMenu}
                actions={[
                    <RaisedButton
                        onClick={this.props.onDone}
                        backgroundColor={this.props.buttonColor}
                        fullWidth={true}
                    >
                        确定
                    </RaisedButton>
                ]}
                autoScrollBodyContent={true}
                contentStyle={formSize}
            >
                <TextInput inputIcon={<SearchIcon/>}
                           label={'搜索你的课名'}
                           onChange={this.onSearchChange.bind(this)}
                           value={this.state.searchText}
                />
            </Dialog>
        );
    }

}

SearchableDialogMenu.propTypes = {
    showMenu: PropTypes.bool.isRequired,
    onDone: PropTypes.func.isRequired,
    buttonColor: PropTypes.string.isRequired,
    handleSearchChange: PropTypes.func.isRequired,
};

export default SearchableDialogMenu;
