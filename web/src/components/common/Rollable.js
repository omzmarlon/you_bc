'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
const classNames = require('classnames');
import './Rollable.less';

class Rollable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rollingItems: this.props.rollingItems
        };
    }

    rotateContent() {
        let list = this.state.rollingItems;
        let first = list.shift(); // get the first element and pop it out
        list.push(first); // push the popped element to the last
        this.setState({
            rollingItems: list
        });
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
                {this.state.rollingItems.map((item, index) => <div key={index}>{item}</div>)}
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

