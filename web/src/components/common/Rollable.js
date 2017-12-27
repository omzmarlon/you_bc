'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
const classNames = require('classnames');
import { CSSTransition, TransitionGroup} from 'react-transition-group';
import './Rollable.less';

class Rollable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0,
        };
    }

    rotateContent() {
        if (this.state.currentIndex < this.props.rollingItems.length-1) {
            this.setState({
                currentIndex: this.state.currentIndex+1
            });
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
                <TransitionGroup>
                    <CSSTransition key={this.state.currentIndex} classNames="roller" timeout={800}>
                        <div>{this.props.rollingItems[this.state.currentIndex]}</div>
                    </CSSTransition>
                </TransitionGroup>
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
    width: 36,
    height: 36,
    className: ''
};

export default Rollable;

