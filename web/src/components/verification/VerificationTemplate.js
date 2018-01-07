'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './VerificationTemplate.less';
import NavHeader from "../common/NavHeader";
import {PRIMARY_GREEN} from "../../styles/constants/colors";
import Paper from "material-ui/Paper";

const bodyStyle = {
    maxHeight: '75vh',
    width: '90vw',
    margin: 'auto',
    transform: 'translateY(18vh)'
};

class VerificationTemplate extends Component {

    render() {
        return (
            <div className="verification-container">
                <NavHeader color={PRIMARY_GREEN} title={this.props.header} />
                <Paper style={bodyStyle} zDepth={1}>
                    {this.props.children}
                </Paper>
            </div>
        );
    }
}

VerificationTemplate.propTypes = {
    header: PropTypes.string.isRequired
};

export default VerificationTemplate;