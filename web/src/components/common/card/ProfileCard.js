'use strict';

// libs
import React from 'react';
import PropTypes from 'prop-types';
import List from 'material-ui/List/List';
// components
import PokeCard from './PokeCard';
import PokeAvatar from '../PokeAvatar';
import './ProfileCard.less';

const ProfileCard = (props) => (
    <PokeCard>
        <div className="profile-card-body">
            <PokeAvatar
                className="profile-card-avatar"
                img={props.avatar}
                name={props.name}
                info={{
                    gender: props.gender,
                    age: props.age,
                    constellation: props.constellation
                }}
            />
            <List className="profile-card-list">
                {props.contentList.map((content,index) => (
                    <div key={index} className="profile-card-list-item">
                        {content.leftElement}
                        {content.rightElement}
                    </div>
                ))}
            </List>
        </div>
    </PokeCard>
);

ProfileCard.propTypes = {
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    gender: PropTypes.oneOf(['male', 'female']).isRequired,
    age: PropTypes.number.isRequired,
    constellation: PropTypes.string.isRequired,
    contentList: PropTypes.arrayOf(
        PropTypes.shape({
            leftElement: PropTypes.element,
            rightElement: PropTypes.element
        })
    ).isRequired
};

export default ProfileCard;