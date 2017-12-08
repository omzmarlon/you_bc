import React from 'react';
import PropTypes from 'prop-types';

/**
 * Thin wrapper around img to treat it as .svg or .png icon component
 * */
const Icon = (props) => {
    return (
        <img {...props}/>
    );
};

Icon.propTypes = {
    src: PropTypes.string.isRequired
};

export default Icon;
