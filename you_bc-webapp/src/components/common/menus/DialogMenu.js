import React from 'react';
import PropTypes from 'prop-types';
// components
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
//styles
import {modalStyles} from "../../../styles/constants/modal";


const menuItemStyle = {
    display: 'flex',
    alignItems: 'center'
};

const errorTextStyle = {
    fontSize: 12,
    color: 'rgb(244, 67, 54)',
    marginLeft: 17
};

export const DialogMenu = (props) => (
    <Dialog
        contentStyle={ modalStyles.dialogContent }
        bodyStyle={ modalStyles.dialogBody }
        style={ modalStyles.dialogRoot }
        repositionOnUpdate={ false }
        open={props.showMenu}
        actions={[
            <RaisedButton
                onClick={props.onDone}
                backgroundColor={props.buttonColor}
                fullWidth={true}
            >
                Submit
            </RaisedButton>
        ]}
        autoScrollBodyContent={false}
    >
        <div style={{
            maxHeight: '50vh',
            overflowY: 'scroll'
        }}>
            <Menu value={props.values}
                  multiple={props.multiple}
                  onItemClick={props.onItemClick}
                  selectedMenuItemStyle={{
                      backgroundColor: 'rgb(128, 128, 128)',
                      color: 'white'
                  }}
                  style={{width: '100%'}}
                  width={'1%'} //Have to set this for 100% width to work. seems to be a bug from material-ui
                  menuItemStyle={{width: '100%'}}
                  autoWidth={false}
            >
                {
                    props.options.map(
                        (c, index) =>
                            <MenuItem style={menuItemStyle}
                                      key={index}
                                      value={c}
                                      primaryText={c}
                            />
                    )
                }
            </Menu>
        </div>
        <span style={errorTextStyle}>{props.errorText}</span>
    </Dialog>
);

DialogMenu.propTypes = {
    showMenu: PropTypes.bool.isRequired,
    onDone: PropTypes.func.isRequired,
    buttonColor: PropTypes.string.isRequired,
    values: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.string
    ]).isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    onItemClick: PropTypes.func.isRequired, // signature onCoursesChange(event, menuItem, index)
    multiple: PropTypes.bool.isRequired,
    errorText: PropTypes.string
};

export default DialogMenu;