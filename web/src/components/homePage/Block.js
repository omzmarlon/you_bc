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
import {TO_CLASSMATES, TO_FRIENDS, TO_ROOMMATES} from "../../constants/api";
import "../../styles/constants/fonts.less";
import {PRIMARY_WHITE} from "../../styles/constants/colors";

const Block = (props) => {
    return (
        <Link to={props.path} className={'block-link'}>
            <div className={"index-page-block"} style={{backgroundColor: props.color}}>
                <span className={'block-font'} style={{color: PRIMARY_WHITE}}>
                    {props.displayName}
                </span>
            </div>
        </Link>
    );
};

Block.propTypes = {
    path: PropTypes.oneOf([TO_CLASSMATES, TO_FRIENDS, TO_ROOMMATES]).isRequired,
    color: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
};

export default Block;