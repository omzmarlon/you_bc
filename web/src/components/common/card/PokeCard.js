'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import "./PokeCard.less";

const PokeCard = (props) => {
    return (
        <Paper>
            <div className="poke-card-head">
                {props.leftIcon && <div className="poke-card-head-left-icon">{props.leftIcon}</div>}
                {props.rightIcon && <IconButton className="poke-card-head-right-icon">{props.rightIcon}</IconButton>}
            </div>
            <div className="poke-card-body">
                {props.avatarElement}
                {props.listElement}
            </div>
        </Paper>
    );
};

PokeCard.propTypes = {
    expandable: PropTypes.bool,
    leftIcon: PropTypes.element,
    rightIcon: PropTypes.element,
    avatarElement: PropTypes.element,
    listElement: PropTypes.element.isRequired
};

PokeCard.defaultProps = {
    expandable: false
};

export default PokeCard;
