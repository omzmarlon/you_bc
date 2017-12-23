'use strict';
import React from 'react';
import PropTypes from 'prop-types';

const Tag = (props) => {
    const verticalPadding = props.fontSize*0.60;
    const horizontalPadding = props.fontSize*0.80;
    return (
        <div
            className={props.classNames}
            style={{
                borderRadius: 5,
                backgroundColor: props.bkgColor,
                fontSize: props.fontSize,
                color: props.textColor,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: `${verticalPadding}px ${horizontalPadding}px`
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
    fontSize: 12
};

export default Tag;
