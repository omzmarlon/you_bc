'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import "./PokeCard.less";

const PokeCard = (props) => {
    return (
        <Paper>
            {props.leftCorner && <div className="poke-card-head">
                {props.leftCorner}
                {props.rightCorner && <span className="poke-card-head-right-icon">{props.rightCorner}</span>}
            </div>}
            {props.children}
        </Paper>
    );
};

PokeCard.propTypes = {
    leftCorner: PropTypes.element,
    rightCorner: PropTypes.element,
    children: PropTypes.node.isRequired
};

export default PokeCard;
