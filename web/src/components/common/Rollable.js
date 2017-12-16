'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
const classNames = require('classnames');
import { CSSTransitionGroup } from 'react-transition-group';
import './Rollable.less';

class Rollable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0
        };
    }

    rotateContent() {
        if (this.state.currentIndex < this.props.rollingItems.length-1) {
            this.setState({currentIndex: this.state.currentIndex+1});
        } else {
            this.setState({currentIndex: 0});
        }
    }

    componentDidMount() {
        this.timer = setInterval(
            this.rotateContent.bind(this),
            this.props.rollingInterval
        );
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        let style = classNames('rollable-container', {[this.props.className]: true});
        return (
            <div className={style} style={{width: this.props.width, height: this.props.height}}>
                <CSSTransitionGroup transitionName="roller" transitionEnterTimeout={800} transitionLeaveTimeout={800}>
                    <div key={this.state.currentIndex}>{this.props.rollingItems[this.state.currentIndex]}</div>
                </CSSTransitionGroup>
            </div>
        );
    }
}

Rollable.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    className: PropTypes.string,
    rollingItems: PropTypes.arrayOf(PropTypes.element).isRequired,
    rollingInterval: PropTypes.number.isRequired
};

Rollable.defaultProps = {
    width: 150,
    height: 150,
    className: ''
};

export default Rollable;

