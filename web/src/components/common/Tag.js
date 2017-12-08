'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import Chip from 'material-ui/Chip';
//styles
import './Tag.less';

const Tag = (props) => {
    return (
        <Chip
            backgroundColor={props.bkgColor}
            className={'common-tag'}
        >
            <span style={{color: props.textColor}}>{props.text}</span>
        </Chip>
    );
};

Tag.propTypes = {
    text: PropTypes.string.isRequired,
    bkgColor: PropTypes.string.isRequired,
    textColor: PropTypes.string.isRequired
};

export default Tag;
