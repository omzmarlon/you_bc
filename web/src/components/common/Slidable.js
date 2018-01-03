'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import Swipeable from 'react-swipeable';
const classNames = require('classnames');
import './Slidable.less';

class Slidable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            swipeDelta: '0',
            animate: false
        };
        this.swipingHandler = this.swipingHandler.bind(this);
        this.swipedHandler = this.swipedHandler.bind(this);
    }

    swipingHandler(e, deltaX) {
        this.setState({
            swipeDelta: `${-deltaX}px`,
            animate: false
        });
    }

    swipedHandler(e, deltaX) {
        if (Math.abs(deltaX) > this.props.threshold) {
            this.setState({swipeDelta: `${-Math.sign(deltaX)*100}%`, animate: true});
            this.props.onFullSwipe(deltaX);
        } else {
            // re-position child element if swipe is not large enough
            setTimeout(()=> this.setState({swipeDelta: 0, animate: true}), 50);
        }
    }

    render() {
        return (
            <Swipeable
                onSwiping={this.swipingHandler}
                onSwiped={this.swipedHandler}
            >
                <div style={{transform: `translateX(${this.state.swipeDelta})`}}
                     className={classNames({'slidable-container': this.state.animate})}
                >
                    {this.props.element}
                </div>
            </Swipeable>
        );
    }
}


Slidable.propTypes = {
    element: PropTypes.element.isRequired,
    threshold: PropTypes.number, // min pixels moved to consider a swipe as a full swipe
    onFullSwipe: PropTypes.func // called when a non-trivial swipe occurred
};

Slidable.defaultProps = {
    threshold: 100,
    onFullSwipe: () => {}
};

export default Slidable;
