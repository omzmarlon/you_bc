'use strict';
/**
 * It's a Link wrapper that will be used in index page
 */

// libs
import React, {Component} from 'react'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
//styles
import '../../styles/homePageContainer.less';

const Block = (props) => {
    let blockClass = 'index-page__block --' + props.type;
    return (
        <Link to={props.path}>
            <div className={blockClass}>
                {props.displayName}
            </div>
        </Link>
    );
};

Block.propTypes = {
    type: PropTypes.oneOf(['classmates', 'friends', 'roommates']).isRequired,
    path: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
};

export default Block;