import React from 'react';
import PropTypes from 'prop-types';
// components
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Chip from 'material-ui/Chip';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Progress from 'material-ui/CircularProgress';

//styles
import {formSize} from '../../../styles/material/formStyles';
import "./SearchableDialogMenu.less";
import SearchBar from "../form/SearchBar";

const menuStyle = {
    display: 'flex',
    flexDirection: 'column'
};

const menuItemStyle = {
    display: 'flex',
    alignItems: 'center'
};

class SearchableDialogMenu extends React.Component {
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
                contentStyle={{...formSize, ...menuStyle}}
            >
                <SearchBar handleSearchChange={this.props.handleSearchChange}/>

                <Paper zDepth={1}
                       className={'chosen-courses-container'}
                >
                    <div className={'searchable-dialog-title'}>已选课程:</div>
                    <Divider/>
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
                <Paper zDepth={1} className={'courses-found-container'}>
                    <div className={'searchable-dialog-title'}>搜索到的课程：</div>
                    <Divider/>
                    {
                        this.props.loadingOptions?
                            <Progress style={{margin: '10px auto'}}/>:
                            <Menu value={this.props.values}
                                  multiple={this.props.multiple}
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
                </Paper>

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
