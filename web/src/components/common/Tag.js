'use strict';
import React from 'react';
import PropTypes from 'prop-types';

const Tag = (props) => {
    const padding = props.fontSize*0.20;
    return (
        <div
            className={props.classNames}
            style={{
                borderRadius: 10,
                backgroundColor: props.bkgColor,
                fontSize: props.fontSize,
                color: props.textColor,
                height: '1.5em',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: `${padding}px`
            }}
        >
            <span>{props.text}</span>
        </div>
    );
};

Tag.propTypes = {
    text: PropTypes.string.isRequired,
    bkgColor: PropTypes.string.isRequired,
    textColor: PropTypes.string.isRequired,
    fontSize: PropTypes.number,
    classNames: PropTypes.string
};

Tag.defaultProps = {
    fontSize: 45
};

export default Tag;
