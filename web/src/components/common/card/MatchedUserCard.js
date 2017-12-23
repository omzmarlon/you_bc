'use strict';

// libs
import React from 'react';
import PropTypes from 'prop-types';
import CopyIcon from 'material-ui/svg-icons/content/content-copy';

// components
import PokeCard from './PokeCard';
import PokeAvatar from '../PokeAvatar';
import Tag from '../Tag';
// constants
import {CLASSMATES, FRIENDS, ROOMMATES} from '../../../constants/api';
import {PRIMARY_YELLOW, SECONDARY_YELLOW, PRIMARY_RED, SECONDARY_RED, PRIMARY_BLUE, SECONDARY_BLUE} from '../../../styles/constants/colors';

// styling
import './MatchedUserCard.less';

const MatchedUserCard = (props) => {
    let tagColor = {};
    switch (props.type) {
        case CLASSMATES:
            tagColor = {bkg: SECONDARY_RED, text: PRIMARY_RED};
            break;
        case FRIENDS:
            tagColor = {bkg: SECONDARY_YELLOW, text: PRIMARY_YELLOW};
            break;
        case ROOMMATES:
            tagColor = {bkg: SECONDARY_BLUE, text: PRIMARY_BLUE};
            break;
        default:
            tagColor = {bkg: SECONDARY_RED, text: PRIMARY_RED};
    }

    return (
        <PokeCard
            rightCorner={<CopyIcon style={{color: 'grey', height: 24, width: 24}}/>}
        >
            <div className="matched-user-card-body">
                <PokeAvatar
                    className="matched-user-card-avatar"
                    img={props.avatar}
                />
                <div className="matched-user-card-info">
                    <span className="--name">{props.name}</span>
                    <span className="--weChat">微信号：{props.weChatId}</span>
                    <div className="matched-user-card-tags">
                        {props.tags.map((tag,index) => (
                            <div key={index} className="--tag">
                                <Tag text={tag} bkgColor={tagColor.bkg} textColor={tagColor.text}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </PokeCard>
    );
};

MatchedUserCard.propTypes = {
    type: PropTypes.oneOf([CLASSMATES, FRIENDS, ROOMMATES]).isRequired,
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    weChatId: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default MatchedUserCard;
