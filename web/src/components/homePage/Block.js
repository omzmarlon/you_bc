'use strict';
/**
 * It's a Link wrapper that will be used in index page
 */

// libs
import React from 'react'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
//styles
import './Block.less';
import "../../styles/constants/fonts.less";
import {PRIMARY_WHITE} from "../../styles/constants/colors";
//constants
import {CLASSMATES, FRIENDS, ROOMMATES} from "../../constants/api";

const Block = (props) => {
    return (
        <Link to={props.path} className={'block-link'}>
            <div className={"index-page-block"} style={{backgroundColor: props.color}}>
                <span className={'common-font'} style={{color: PRIMARY_WHITE}}>
                    {props.displayName}
                </span>
            </div>
        </Link>
    );
};

Block.propTypes = {
    color: PropTypes.string.isRequired,
    path: PropTypes.oneOf([CLASSMATES, FRIENDS, ROOMMATES]).isRequired,
    displayName: PropTypes.string.isRequired,
};

export default Block;