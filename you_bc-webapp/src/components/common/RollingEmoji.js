'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import "./RollingEmoji.less";
import Rollable from "./Rollable";
import {friendRollingIcon} from "../../constants/misc";

const RollingEmoji = props => (
    <div className="friend-display-name">
        <span>找</span>
        <Rollable
            style={props.rollableStyle}
            rollingInterval={props.rollingInterval}
            rollingItems={friendRollingIcon(props.iconSize)}
        />
        <span>友</span>
    </div>
);

RollingEmoji.propTypes = {
    rollableStyle: PropTypes.object,
    rollingInterval: PropTypes.number,
    iconSize: PropTypes.number
};

RollingEmoji.defaultProps = {
    rollingInterval: 1000,
    iconSize: 40
};

export default RollingEmoji;