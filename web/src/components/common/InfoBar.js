'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import "./InfoBar.less";

const InfoBar = (props) => {
    return (
        <div>
            {props.show && <div className={'info-bar'}>
                <span className={'info-bar-msg'}>{props.msg}</span>
            </div>}
        </div>
    );
};

InfoBar.propTypes = {
    msg: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired
};

export default InfoBar;
