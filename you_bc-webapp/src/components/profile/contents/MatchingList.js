'use strict';
import React from 'react';
import './MatchingList.less';
import PropTypes from 'prop-types';
import MatchedUserCard from "../../common/card/MatchedUserCard";
import {connect} from 'react-redux';

const cardMargin = {margin:15};

class MatchingList extends React.Component {


    renderMatchedUsers() {
        return (
            this.props.matchedUsers.map((matchedUser, i) => (
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
    }

    render() {
        return (
            <div className={'matching-list-container'}>
                {
                    this.props.matchedUsers.length?
                        this.renderMatchedUsers():
                        <div className={'matching-list-no-user'}>
                            <p className={'matching-list-label'}>You Haven't Matched With Anyone Yet :(</p>
                            <p className={'matching-list-label'}>Keep Swiping!</p>
                        </div>
                }
            </div>
        );
    }
}

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
