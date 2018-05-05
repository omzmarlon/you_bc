'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import "./InfoBar.less";
import {connect} from 'react-redux';

const InfoBar = (props) => {
    return (
        <div>
            {props.show && <div className={'info-bar'}>
                <span className={'info-bar-msg'}>{props.msg}</span>
            </div>}
        </div>
    );
};

InfoBar.propTypes = {
    msg: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
    show: PropTypes.bool.isRequired
};

const mapStateToProps = (states) => ({
    show: states.global.showInfoBar,
    msg: states.global.infoBarMessage
});

export default connect(mapStateToProps)(InfoBar);
