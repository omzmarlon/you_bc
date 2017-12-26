import React from 'react';
import PropTypes from 'prop-types';
import reactIcon from "../../public/images/react_icon.png";
import './Dummy.less';

const Dummy = (props) => {
    return (
        <div className="dummy">
            <p>This is a {props.name}!</p>
            <img src={reactIcon}/>
            <button onClick={props.increment}>{props.counter}</button>
        </div>
    );
};

Dummy.propTypes = {
    increment: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    counter: PropTypes.number.isRequired
};

export default Dummy;