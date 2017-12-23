'use strict';

// libs
import React from 'react';
import PropTypes from 'prop-types';
import List from 'material-ui/List/List';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import ClassIcon from 'material-ui/svg-icons/av/library-books';
import HomeIcon from 'material-ui/svg-icons/action/home';
import SprayIcon from 'material-ui/svg-icons/action/favorite-border';
// components
import PokeCard from './PokeCard';
import InfoRow from '../InfoRow';
// constants
import {CLASSMATES, FRIENDS, ROOMMATES} from '../../../constants/api';

// styling
import './ProfileCard.less';

const LeftCornerIcon = (props) => {
    let icon = null;
    let style = {color: 'white', width: 18, height: 18};
    switch (props.type) {
        case CLASSMATES:
            icon = <ClassIcon style={style}/>;
            break;
        case FRIENDS:
            icon = <HomeIcon style={style}/>;
            break;
        case ROOMMATES:
            icon = <SprayIcon style={style}/>;
            break;
        default:
            icon = <SprayIcon style={style}/>;
    }
    let classname = `profile-card-left-corner --${props.type}`;
    return (
        <span className={classname}>
            {icon}
        </span>
    );
};

const ProfileCard = (props) => {
    return (
        <PokeCard
            leftCorner={<LeftCornerIcon type={props.type}/>}
            rightCorner={<EditIcon style={{color: 'grey', height: 24, width: 24}}/>}
        >
            <div className="profile-card-list-wrapper">
                <List className="profile-card-list">
                    {props.contentList.map((content, index) => (
                        <InfoRow
                            key={index}
                            className="profile-card-list-item"
                            leftElement={content.leftElement}
                            rightElement={content.rightElement}
                        />
                    ))}
                </List>
            </div>
        </PokeCard>
    );
};

ProfileCard.propTypes = {
    type: PropTypes.oneOf([CLASSMATES, FRIENDS, ROOMMATES]),
    contentList: PropTypes.arrayOf(
        PropTypes.shape({
            leftElement: PropTypes.element,
            rightElement: PropTypes.element
        })
    ).isRequired
};

export default ProfileCard;
