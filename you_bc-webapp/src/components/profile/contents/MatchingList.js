'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import MatchedUserCard from "../../common/card/MatchedUserCard";
import {connect} from 'react-redux';

const cardMargin = {margin:15};

const MatchingList = (props) => (
    props.matchedUsers.map((matchedUser, i) => (
        <div style={cardMargin} key={i}>
            <MatchedUserCard avatarURL={matchedUser.avatarURL}
                             username={matchedUser.username}
                             weChatId={matchedUser.weChatId}
                             matchedAtClassmates={matchedUser.matchedAtClassmates}
                             matchedAtRoommates={matchedUser.matchedAtRoommates}
                             matchedAtFriends={matchedUser.matchedAtFriends}
            />
        </div>
    ))
);

MatchingList.propTypes = {
    matchedUsers: PropTypes.arrayOf(PropTypes.shape({
        avatarURL: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        weChatId: PropTypes.string.isRequired,
        matchedAtClassmates: PropTypes.bool.isRequired,
        matchedAtRoommates: PropTypes.bool.isRequired,
        matchedAtFriends: PropTypes.bool.isRequired,
    })).isRequired
};

const mapStateToProps = (state, ownProps) => ({
    matchedUsers: state.profile.matchedUsers
});

export default connect(mapStateToProps)(MatchingList);
