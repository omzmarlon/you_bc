'use strict';
// libs
import React, {Component} from 'react'
import PropTypes from 'prop-types';
const classNames = require('classnames');
// constants
import {getColorClass, PRIMARY_BLUE, PRIMARY_RED, PRIMARY_GREEN, PRIMARY_YELLOW} from "../../constants/color";
// styles
import './Header.less';
import '../../styles/constants/colors.less';

const Header = (props) => {
    let classes = Object.assign({}, getColorClass(props.color), {'common-header': true});
    return (
        <div className={classNames(classes)}>
            <span className={'action-left'}>{props.actionLeft}</span>
            <span className={'header-title'}>{props.title}</span>
            <span className={'action-right'}>{props.actionRight}</span>
        </div>
    );
};

Header.propTypes = {
    title: PropTypes.string.isRequired,
    actionLeft: PropTypes.element.isRequired,
    actionRight: PropTypes.element,
    color: PropTypes.oneOf([PRIMARY_BLUE, PRIMARY_RED, PRIMARY_GREEN, PRIMARY_YELLOW]).isRequired
};

export default Header;