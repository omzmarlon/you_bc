'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './AuthTemplate.less';
import NavHeader from "../common/NavHeader";
import {PRIMARY_GREEN} from "../../styles/constants/colors";
import Paper from "material-ui/Paper";

const bodyStyle = {
    maxHeight: '85vh',
    width: '90vw',
    margin: 'auto',
    transform: 'translateY(50%)'
};

class AuthTemplate extends Component {

    render() {
        return (
            <div className="auth-container">
                <NavHeader color={PRIMARY_GREEN} title={this.props.header} hideBackArrow={true} />
                <Paper style={bodyStyle} zDepth={1}>
                    {this.props.children}
                </Paper>
            </div>
        );
    }
}

AuthTemplate.propTypes = {
    header: PropTypes.string.isRequired
};

export default AuthTemplate;
