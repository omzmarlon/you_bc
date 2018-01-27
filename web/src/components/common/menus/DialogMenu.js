import React from 'react';
import PropTypes from 'prop-types';
// components
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
//styles
import {formSize} from '../../../styles/material/formStyles';


const menuItemStyle = {
    display: 'flex',
    alignItems: 'center'
};

export const DialogMenu = (props) => (
    <Dialog
        open={props.showMenu}
        actions={[
            <RaisedButton
                onClick={props.onDone}
                backgroundColor={props.buttonColor}
                fullWidth={true}
            >
                确定
            </RaisedButton>
        ]}
        autoScrollBodyContent={true}
        contentStyle={formSize}
    >
        <Menu value={props.values}
              multiple={props.multiple}
              onItemClick={props.onItemClick}
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
    onItemClick: PropTypes.func.isRequired,
    multiple: PropTypes.bool.isRequired
};

export default DialogMenu;