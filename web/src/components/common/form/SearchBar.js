import React from 'react';
import PropTypes from 'prop-types';
//icons
import SearchIcon from 'material-ui/svg-icons/action/search';
// components
import TextInput from "../form/TextInput";

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: ''
        };
    }

    onSearchChange(event, newValue) {
        clearTimeout(this.timer);
        this.setState({searchText: newValue});
        this.timer = setTimeout(this.triggerChangeCallback.bind(this), this.props.delay);
    }

    triggerChangeCallback() {
        const { searchText } = this.state;
        this.props.handleSearchChange(searchText);
    }

    render() {
        return (
            <TextInput inputIcon={<SearchIcon/>}
                       label={'搜索你的课名'}
                       onChange={this.onSearchChange.bind(this)}
                       value={this.state.searchText}
                       type={'text'}
            />
        );
    }

}

SearchBar.propTypes = {
    handleSearchChange: PropTypes.func.isRequired,
    delay: PropTypes.number.isRequired,
};

SearchBar.defaultProps = {
    delay: 1000
};

export default SearchBar;