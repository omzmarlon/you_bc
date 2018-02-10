'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './TruncateText.less';
import {Dialog} from "material-ui";

class TruncateText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        };
        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler() {
        this.setState({expanded: ! this.state.expanded});
    }

    render() {
        let expandable = this.props.text.length > this.props.maxLength;
        const firstLine = this.props.text.substring(0, this.props.maxLength);
        let visibleText = expandable ? `${firstLine}...` : this.props.text;
        return (
            <div style={this.props.style} className="truncate-text" onClick={this.clickHandler}>
                <div style={this.props.textStyle}>{visibleText}</div>
                <Dialog open={expandable && this.state.expanded} title={this.props.modalTitle} onRequestClose={this.clickHandler}>
                    {this.props.text}
                </Dialog>
            </div>
        );
    }
}

TruncateText.propTypes = {
    text: PropTypes.string.isRequired,
    maxLength: PropTypes.number,
    style: PropTypes.object,
    textStyle: PropTypes.object,
    modalTitle: PropTypes.string.isRequired
};

TruncateText.defaultProps = {
    maxLength: 8,
    style: {},
    textStyle: {}
};

export default TruncateText;