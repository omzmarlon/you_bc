'use strict';
// libs
import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
// assets
import MaleIcon from './svg/MaleIcon';
import FemaleIcon from './svg/FemaleIcon';
// styles
import './PokeAvatar.less';
import {PRIMARY_RED, PRIMARY_BLUE} from "../../styles/constants/colors";

const PokeAvatar = (props) => {
    return (
        <div className='poke-avatar'>
            <Avatar src={props.img}/>
            {props.name && <div className='poke-avatar-name'>{props.name}</div>}
            {props.info && <div className='poke-avatar-info'>
                <span className='poke-avatar-gender-icon'>
                    {
                        (props.info.gender === 'female') ?
                            <FemaleIcon viewBox="0 0 1000 1000" style={{height: 12, width: 12}} color={PRIMARY_RED}/> :
                            <MaleIcon viewBox="0 0 1000 1000" style={{height: 12, width: 12}} color={PRIMARY_BLUE}/>
                    }
                </span>
                <span className='poke-avatar-age'>{props.info.age}</span>
                <span className='poke-avatar-constellation'>{props.info.constellation}</span>
            </div>}
        </div>
    );
};

PokeAvatar.propTypes = {
    img: PropTypes.string.isRequired,
    name: PropTypes.string,
    info: PropTypes.shape({
        gender: PropTypes.oneOf(['male', 'female']),
        age: PropTypes.number,
        constellation: PropTypes.string
    })
};

export default PokeAvatar;
