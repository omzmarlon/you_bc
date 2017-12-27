'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import {PRIMARY_GREEN, SECONDARY_GREEN} from "../../styles/constants/colors";

const Tag = (props) => {
    const verticalPadding = props.fontSize*0.60;
    const horizontalPadding = props.fontSize*0.80;
    return (
        <div
            className={props.classNames}
            style={Object.assign({},
                props.style,
                {
                    borderRadius: 5,
                    backgroundColor: props.bkgColor,
                    fontSize: props.fontSize,
                    color: props.textColor,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: `${verticalPadding}px ${horizontalPadding}px`
                }
            )}
        >
            <span>{props.text}</span>
        </div>
    );
};

Tag.propTypes = {
    text: PropTypes.string.isRequired,
    fontSize: PropTypes.number,
    classNames: PropTypes.string,
    style: PropTypes.object
};

Tag.defaultProps = {
    fontSize: 12,
    bkgColor: PRIMARY_GREEN,
    textColor: SECONDARY_GREEN
};

export default Tag;
