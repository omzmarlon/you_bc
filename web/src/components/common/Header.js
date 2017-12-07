'use strict';
// libs
import React from 'react'
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';

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
    color: PropTypes.string.isRequired
};
export default Header;