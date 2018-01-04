'use strict';
// libs
import React, {Component} from 'react'
import { connect }  from 'react-redux'
//components
import MainListTemplate from '../components/mainlist/MainListTemplate';
import LoadingModal from "../components/common/LoadingModal";
// actions
import {
    dislikeCandidate,
    fetchCandidates, fetchMoreCandidate, likeCandidate,
    updateVisibleUsersAndCandidates
} from "../actions/mainList/RoommateActions";
import {PRIMARY_BLUE, SECONDARY_BLUE } from "../styles/constants/colors";

class RoommateContainer extends Component {
    constructor(props) {
        super(props);
        this.onUserSwiped = this.onUserSwiped.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchCandidates(10));
    }

    onUserSwiped(index, deltaX) {
        const { dispatch } = this.props;
        let targetUser = this.props.visibleUsers[index];
        /*
         1. remove swiped user from visibleUsers
         2. pop a user from candidates and add it to the end of visibleUsers (if candidates is not empty)
         3. detect like/dislike action, make a post request
         4. make a new request fetch one more user and add to candidates
         */
        dispatch(updateVisibleUsersAndCandidates(index));
        dispatch(fetchMoreCandidate(1));
        (deltaX < 0) ? likeCandidate(targetUser) : dislikeCandidate(targetUser);
    }

    render() {
        return(
            <div>
                <LoadingModal show={this.props.isFetching}/>
                <MainListTemplate
                    title="找室友"
                    themeColor={PRIMARY_BLUE}
                    subThemeColor={SECONDARY_BLUE}
                    userList={this.props.visibleUsers}
                    onUserSwiped={this.onUserSwiped}
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isFetching: state.mainList.isFetching,
    candidates: state.mainList.candidates,
    visibleUsers: state.mainList.visibleUsers
});

export default connect(mapStateToProps)(RoommateContainer);