'use strict';
// libs
import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
const classNames = require('classnames');
// assets
import MaleIcon from './svg/MaleIcon';
import FemaleIcon from './svg/FemaleIcon';
// styles
import './PokeAvatar.less';
import {PRIMARY_RED, PRIMARY_BLUE} from "../../styles/constants/colors";

const PokeAvatar = (props) => {
    let rootClassName = classNames('poke-avatar', {[props.className]: true});

    return (
        <div className={rootClassName}>
            <Avatar style={{height: 64, width: 64}} src={props.img}/>
            {props.name && <div className='poke-avatar-name'>{props.name}</div>}
            {props.info && <div className='poke-avatar-info'>
                <span className='poke-avatar-gender-icon'>
                    {
                        (props.info.gender === 'female') ?
                            <FemaleIcon style={{height: 12, width: 12}} color={PRIMARY_RED}/> :
                            <MaleIcon style={{height: 12, width: 12}} color={PRIMARY_BLUE}/>
                    }
                </span>
                <span>{props.info.age}</span>
                <span className='poke-avatar-constellation'>{props.info.constellation}</span>
            </div>}
            {props.matchRate && <div className="poke-avatar-matchRate" style={{color: props.matchRateColor}}>
                契合度 {props.matchRate * 100} %
            </div>}
        </div>
    );
};

PokeAvatar.propTypes = {
    className: PropTypes.string,
    img: PropTypes.string.isRequired,
    name: PropTypes.string,
    info: PropTypes.shape({
        gender: PropTypes.oneOf(['male', 'female']),
        age: PropTypes.number,
        constellation: PropTypes.string
    }),
    matchRateColor: PropTypes.string,
    matchRate: PropTypes.number // assume its a decimal number from 0 to 1
};

PokeAvatar.defaultProps = {
    className: '',
    matchRateColor: PRIMARY_RED
};

export default PokeAvatar;
