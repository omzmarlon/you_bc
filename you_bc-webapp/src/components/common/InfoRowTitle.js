'use strict';

import React from 'react';
import PropTypes from 'prop-types';

const InfoRowTitle = (props) => (
    <span style={{
        display: 'flex',
        alignItems: 'center'
    }}>
        {props.icon}
        <span style={{marginLeft: 5}}>{props.text}</span>
    </span>
);

InfoRowTitle.propTypes = {
    icon: PropTypes.element.isRequired,
    text: PropTypes.string.isRequired
};

export default InfoRowTitle;
