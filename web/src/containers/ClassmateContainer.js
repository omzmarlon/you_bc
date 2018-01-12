'use strict';
// libs
import React, {Component} from 'react'
import { connect }  from 'react-redux'
// component
import MainListTemplate from "../components/mainlist/MainListTemplate";
import LoadingModal from "../components/common/modal/LoadingModal";
import MissingProfileInfoModal from "../components/common/modal/MissingProfileInfoModal";
import { Redirect } from "react-router-dom";
// styles
import { PRIMARY_RED, SECONDARY_RED } from '../styles/constants/colors'
// actions
import {
    dislikeCandidate,
    fetchCandidates, fetchMoreCandidate, likeCandidate,
    updateVisibleUsersAndCandidates
} from "../actions/mainList/classmateActions";

class ClassmateContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMissingInfoModal: false
        };
        this.onUserSwiped = this.onUserSwiped.bind(this);
        this.genderFilter = this.genderFilter.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchCandidates(10));
    }

    onUserSwiped(index, deltaX) {
        const { dispatch, hasInfo } = this.props;
        let targetUser = this.props.visibleUsers[index];
        if (!hasInfo) {
            this.setState({showMissingInfoModal: true});
        } else {
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
    }

    genderFilter(event, child) {
        const { dispatch } = this.props;
        dispatch(fetchCandidates(10, child.key));
    }

    render() {
        if (this.props.grantAccess) {
            return(
                <div>
                    <MainListTemplate
                        title="找课友"
                        themeColor={PRIMARY_RED}
                        subThemeColor={SECONDARY_RED}
                        userList={this.props.visibleUsers}
                        onUserSwiped={this.onUserSwiped}
                        genderFilter={this.genderFilter}
                    />
                    <LoadingModal show={this.props.isFetching}/>
                    <MissingProfileInfoModal
                        openModal={this.state.showMissingInfoModal}
                        onClose={() => {this.setState({showMissingInfoModal: false})}}
                        content="您还没有填写找课友相关信息，信息完整后才能继续匹配😊 ! 请填写个人主页中找课友（红色部分）信息"
                    />
                </div>
            );
        } else {
            return <Redirect to={"/"}/>;
        }
    }
}

const mapStateToProps = state => ({
    isFetching: state.mainList.isFetching,
    candidates: state.mainList.candidates,
    visibleUsers: state.mainList.visibleUsers,
    hasInfo: !(state.profile.classmates.values.major === ""),
    grantAccess:
    (state.verification.isLocationVerified || state.verification.isEmailVerified || state.verification.isStudentCardVerified)
    &&
    state.authentication.authStatusCode===200
});

export default connect(mapStateToProps)(ClassmateContainer);