'use strict';
// libs
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect }  from 'react-redux'
// component
import MainListTemplate from "../components/mainlist/MainListTemplate";
import LoadingModal from "../components/common/modal/LoadingModal";
import MissingProfileInfoModal from "../components/common/modal/MissingProfileInfoModal";
import { Redirect } from "react-router-dom";
import {showClassMatesForm, showFriendsForm, showRoommatesForm} from "../actions/profile/profileUIActions";
// actions
import {
    dislikeCandidate,
    fetchCandidates, fetchMoreCandidate, likeCandidate,
    updateVisibleUsersAndCandidates
} from "../actions/mainList/mainListActions";
//constants
import {FETCH_CLASSMATES_API, FETCH_FRIENDS_API, FETCH_ROOMMATES_API} from "../constants/api";

class MainListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMissingInfoModal: false,
            showCardGoBack: false,
            currentGender: 'mix'
        };
        this.onUserSwiped = this.onUserSwiped.bind(this);
        this.genderFilter = this.genderFilter.bind(this);
        this.missingInfoModalActionHandler = this.missingInfoModalActionHandler.bind(this);
    }

    componentDidMount() {
        const { dispatch, fetchAPI } = this.props;
        dispatch(fetchCandidates(fetchAPI, 10));
    }

    onUserSwiped(index, deltaX) {
        const { dispatch, hasInfo, genderFilter, fetchAPI, dislikeAPI, likeAPI } = this.props;
        let targetUser = this.props.visibleUsers[index];
        if (!hasInfo) {
            this.setState({showMissingInfoModal: true, shouldCardGoBack: true});
        } else {
            /*
             1. remove swiped user from visibleUsers
             2. pop a user from candidates and add it to the end of visibleUsers (if candidates is not empty)
             3. detect like/dislike action, make a post request
             4. make a new request fetch one more user and add to candidates
             */
            dispatch(updateVisibleUsersAndCandidates(index));
            dispatch(fetchMoreCandidate(fetchAPI, 1, genderFilter));
            (deltaX < 0) ? likeCandidate(likeAPI(targetUser.userId)) : dislikeCandidate(dislikeAPI(targetUser.userId));
        }
    }

    genderFilter(event, child) {
        const { dispatch, fetchAPI } = this.props;
        dispatch(fetchCandidates(fetchAPI, 10, child.key));
        this.setState({currentGender: child.key});
    }

    missingInfoModalActionHandler() {
        const { dispatch, fetchAPI } = this.props;
        switch (fetchAPI) {
            case FETCH_CLASSMATES_API:
                dispatch(showClassMatesForm());
                break;
            case FETCH_ROOMMATES_API:
                dispatch(showRoommatesForm());
                break;
            case FETCH_FRIENDS_API:
                dispatch(showFriendsForm());
        }
        this.setState({showMissingInfoModal: false, shouldGoBack: false});
    }

    render() {
        if (this.props.grantAccess) {
            return(
                <div>
                    <MainListTemplate
                        title={this.props.title}
                        themeColor={this.props.themeColor}
                        subThemeColor={this.props.subThemeColor}
                        userList={this.props.visibleUsers}
                        onUserSwiped={this.onUserSwiped}
                        genderFilter={this.genderFilter}
                        shouldCardGoBack={this.state.shouldCardGoBack}
                        currentGender={this.state.currentGender}
                    />
                    <LoadingModal show={this.props.isFetching}/>
                    <MissingProfileInfoModal
                        openModal={this.state.showMissingInfoModal}
                        content="您还没有填写相关信息，信息完整后才能继续匹配 😊"
                        onClick={this.missingInfoModalActionHandler}
                    />
                </div>
            );
        } else {
            return <Redirect to={"/"}/>;
        }
    }
}

MainListContainer.propTypes = {
    fetchAPI: PropTypes.string.isRequired,
    likeAPI: PropTypes.func.isRequired,
    dislikeAPI: PropTypes.func.isRequired,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
    themeColor: PropTypes.string.isRequired,
    subThemeColor: PropTypes.string.isRequired
};

const hasInfoHelper = (api, profileState) => {
    switch (api) {
        case FETCH_CLASSMATES_API:
            return !(profileState.classmates.major === "");
        case FETCH_ROOMMATES_API:
            return !(profileState.roommates.hometown === "");
        case FETCH_FRIENDS_API:
            return !(profileState.friends.faculty === "");
        default:
            return false;
    }
};

const mapStateToProps = (state, ownProps) => ({
    isFetching: state.mainList.isFetching,
    candidates: state.mainList.candidates,
    visibleUsers: state.mainList.visibleUsers,
    hasInfo: hasInfoHelper(ownProps.fetchAPI, state.profile),
    genderFilter: state.mainList.genderFilter,
    grantAccess:
    (state.verification.isLocationVerified || state.verification.isEmailVerified || state.verification.isStudentCardVerified)
    &&
    state.authentication.authStatusCode===200
});

export default connect(mapStateToProps)(MainListContainer);