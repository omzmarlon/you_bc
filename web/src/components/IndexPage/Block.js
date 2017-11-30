'use strict';
/**
 * It's a Link wrapper that will be used in index page
 */

// libs
import React, {Component} from 'react'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
//styles
import '../../styles/indexpage.less';

const Block = (props) => {
    return (
        <Link to={props.path}>
            <div className={props.className}>
                {props.displayName}
            </div>
        </Link>
    );
};

Block.propTypes = {
    className: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
};

export default Block;