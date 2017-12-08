'use strict';
// libs
import React from 'react'
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
// styles
import {PRIMARY_BLUE, PRIMARY_RED, PRIMARY_GREEN, PRIMARY_YELLOW} from "../../styles/constants/colors";

const Header = (props) => {
    return (
        <AppBar
            title={props.title}
            style={{backgroundColor: props.color}}
            iconElementLeft={props.actionLeft}
            iconElementRight={props.actionRight}
            titleStyle={{
                textAlign: 'center'
            }}
        />
    );
};

Header.propTypes = {
    title: PropTypes.string.isRequired,
    actionLeft: PropTypes.element.isRequired,
    actionRight: PropTypes.element,
    color: PropTypes.oneOf([PRIMARY_BLUE, PRIMARY_RED, PRIMARY_GREEN, PRIMARY_YELLOW]).isRequired
};
export default Header;