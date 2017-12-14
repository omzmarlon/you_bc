'use strict';

// libs
import React from 'react';
import PropTypes from 'prop-types';
import List from 'material-ui/List/List';
// components
import PokeCard from './PokeCard';
import PokeAvatar from '../PokeAvatar';
import InfoRow from '../InfoRow';
import './SearchResultCard.less';

const SearchResultCard = (props) => (
    <PokeCard>
        <div className="search-result-card-body">
            <PokeAvatar
                className="search-result-card-avatar"
                img={props.avatar}
                name={props.name}
                info={{
                    gender: props.gender,
                    age: props.age,
                    constellation: props.constellation
                }}
            />
            <List className="search-result-card-list">
                {props.contentList.map((content,index) => (
                    <InfoRow
                        key={index}
                        className="search-result-card-list-item"
                        leftElement={content.leftElement}
                        rightElement={content.rightElement}
                    />
                ))}
            </List>
        </div>
    </PokeCard>
);

SearchResultCard.propTypes = {
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

export default SearchResultCard;