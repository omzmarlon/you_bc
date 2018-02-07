import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
// components
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Chip from 'material-ui/Chip';
import Paper from 'material-ui/Paper';
import Progress from 'material-ui/CircularProgress';
import SearchBar from "../form/SearchBar";
//styles
import "./SearchableDialogMenu.less";
import {modalStyles} from "../../../styles/constants/modal";
import {isIOS} from "../../../utils/Util";

const menuStyle = {
    display: 'flex',
    flexDirection: 'column'
};

const menuItemStyle = {
    display: 'flex',
    alignItems: 'center'
};

class SearchableDialogMenu extends React.Component {

    scrollToSearchInput() {
        if (!isIOS()) {
            const elementOnFocus = ReactDOM.findDOMNode(this.refs.searchBar);
            if (elementOnFocus && elementOnFocus.scrollIntoView) {
                // needs delay because the scroll may happen before screen squeeze
                setTimeout(() => elementOnFocus.scrollIntoView(), 500);
            }
        }
    }

    render() {
        return (
            <Dialog
                contentStyle={
                    isIOS()? {}: { ...modalStyles.dialogContent, ...menuStyle }
                }
                bodyStyle={
                    isIOS()? modalStyles.dialogContentIOS: modalStyles.dialogBody
                }
                style={
                    isIOS()? {}: modalStyles.dialogRoot
                }
                repositionOnUpdate={ isIOS() }

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
            >
                <Paper zDepth={1}
                       className={'chosen-courses-container'}
                >
                    <div className={'searchable-dialog-title'}>我的课程:</div>
                    <div className={'chosen-courses'}>
                        {
                            this.props.multiple?
                                this.props.values.map(
                                    (val, index) =>
                                        <Chip key={index}
                                              backgroundColor={this.props.chipColor}
                                              onRequestDelete={() => this.props.onChoiceChange(val)}
                                        >
                                            {val}
                                        </Chip>
                                ):
                                <Chip onRequestDelete={() => this.props.onChoiceChange(this.props.values)}
                                      backgroundColor={this.props.chipColor}
                                >
                                    {this.props.values}
                                </Chip>
                        }
                    </div>
                </Paper>
                <SearchBar
                    ref='searchBar'
                    handleSearchChange={this.props.handleSearchChange}
                    onFocus={this.scrollToSearchInput.bind(this)}
                />

                {
                    this.props.options.length !== 0 &&
                    <div className={'courses-found-container'}>
                        {
                            this.props.loadingOptions?
                                <Progress style={{margin: '10px auto'}}/>:
                                <Menu value={this.props.values}
                                      multiple={this.props.multiple}
                                      selectedMenuItemStyle={{
                                          backgroundColor: 'rgb(128, 128, 128)',
                                          color: 'white'
                                      }}
                                >
                                    {
                                        this.props.options.map(
                                            (c, index) =>
                                                <MenuItem onClick={() => this.props.onChoiceChange(c)}
                                                          style={menuItemStyle}
                                                          key={index}
                                                          value={c}
                                                          primaryText={c}
                                                />
                                        )
                                    }
                                </Menu>
                        }
                    </div>
                }

            </Dialog>
        );
    }

}

SearchableDialogMenu.propTypes = {
    showMenu: PropTypes.bool.isRequired,
    onDone: PropTypes.func.isRequired,
    buttonColor: PropTypes.string.isRequired,
    chipColor: PropTypes.string.isRequired,
    handleSearchChange: PropTypes.func.isRequired,
    values: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.string
    ]).isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChoiceChange: PropTypes.func.isRequired, // signature onChoiceChange(choice)
    multiple: PropTypes.bool.isRequired,
    loadingOptions: PropTypes.bool.isRequired
};

SearchableDialogMenu.defaultProps = {
    loadingOptions: false
};

export default SearchableDialogMenu;
