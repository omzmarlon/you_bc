'use strict';

import React from 'react';
import PropTypes from 'prop-types';
const classNames = require('classnames');
import './InfoRow.less';

const InfoRow = (props) => {
    let classname = classNames('info-row', {[props.className]: true});
    return (
        <div className={classname}>
            {props.leftElement}
            {props.rightElement}
        </div>
    );
};

InfoRow.propTypes = {
    className: PropTypes.string,
    leftElement: PropTypes.element.isRequired,
    rightElement: PropTypes.element.isRequired
};

InfoRow.defaultProps = {
    className: ''
};

export default InfoRow;