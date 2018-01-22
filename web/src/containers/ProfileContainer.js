'use strict';
import React from 'react';
import PropTypes from 'prop-types';
// components
import ProfileTabBar from '../components/profile/ProfileTabBar';
import ProfileNavHeader from '../components/profile/ProfileNavHeader';
import { Redirect } from "react-router-dom";
//styles
import './ProfileContainer.less';
// icons
import ProfileMain from "../components/profile/contents/ProfileMain";
import MatchingList from "../components/profile/contents/MatchingList";
// redux
import { connect }  from 'react-redux'
import { bindActionCreators } from 'redux';
import {showMatchingList, showProfileMain} from '../actions/profile/profileUIActions';
import {
    fetchClassmatesInfo, fetchFriendsInfo, fetchMatchedUsers, fetchPersonalInfo,
    fetchRoommatesInfo
} from "../actions/profile/profileFetchActions";
import {
    fetchClassmatesTags, fetchCourses, fetchFaculties, fetchFriendsTags, fetchHometownOptions, fetchLocationOptions,
    fetchMajors, fetchRelationship, fetchRoommatesTags
} from "../actions/profile/profileMenuOptionsFetchActions";

class ProfileContainer extends React.Component {
    componentDidMount() {
        const { store } = this.context;
        // todo: wrap these into a PromiseAll OR keep them separate but have multiple isFetching
        store.dispatch(fetchClassmatesInfo());
        store.dispatch(fetchFriendsInfo());
        store.dispatch(fetchRoommatesInfo());
        store.dispatch(fetchPersonalInfo());
        store.dispatch(fetchMatchedUsers());
        // TODO: may be move all these into forms
        store.dispatch(fetchMajors());
        store.dispatch(fetchCourses());
        store.dispatch(fetchClassmatesTags());
        store.dispatch(fetchLocationOptions());
        store.dispatch(fetchHometownOptions());
        store.dispatch(fetchRoommatesTags());
        store.dispatch(fetchFaculties());
        store.dispatch(fetchRelationship());
        store.dispatch(fetchFriendsTags());
    }

    onTabMatching() {
        const { store } = this.context;
        this.props.onTabMatching();
        store.dispatch(fetchMatchedUsers());
    }

    render() {
        if (this.props.grantAccess) {
            return (
                <div>
                    <ProfileNavHeader/>
                    <div className={'profile-container'} style={{overflow: 'scroll', height: '100%'}}>
                        { this.props.panelIndex === 0 && <ProfileMain /> }
                        { this.props.panelIndex === 1 && <MatchingList /> }
                        <ProfileTabBar onTabMain={this.props.onTabMain} onTabMatching={this.onTabMatching.bind(this)} />
                    </div>
                </div>
            );
        } else {
            return <Redirect to={"/"}/>
        }
    }
}

ProfileContainer.propTypes = {
    //states
    panelIndex: PropTypes.number.isRequired,
    //actions
    onTabMain: PropTypes.func.isRequired,
    onTabMatching: PropTypes.func.isRequired
};

ProfileContainer.contextTypes = {
    store: PropTypes.object
};

const mapStateToProps = (state, ownProps) => ({
    panelIndex: state.profileUI.panelIndex,
    grantAccess:
    (state.verification.isLocationVerified || state.verification.isEmailVerified || state.verification.isStudentCardVerified)
    &&
    state.authentication.authStatusCode===200
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        onTabMain: showProfileMain,
        onTabMatching: showMatchingList
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
