'use strict';
import React from 'react';
import PropTypes from 'prop-types';
// components
import ProfileTabBar from '../components/profile/ProfileTabBar';
import ProfileNavHeader from '../components/profile/ProfileNavHeader';
import InfoBar from '../components/common/InfoBar';
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

class ProfileContainer extends React.Component {
    componentDidMount() {
        const { store } = this.context;
        store.dispatch(fetchClassmatesInfo());
        store.dispatch(fetchFriendsInfo());
        store.dispatch(fetchRoommatesInfo());
        store.dispatch(fetchPersonalInfo());
        store.dispatch(fetchMatchedUsers());
    }

    render() {
        return (
            <div>
                <ProfileNavHeader/>
                <div className={'profile-container'} style={{overflow: 'scroll', height: '100%'}}>
                    { this.props.panelIndex === 0 && <ProfileMain /> }
                    { this.props.panelIndex === 1 && <MatchingList /> }
                    <ProfileTabBar onTabMain={this.props.onTabMain} onTabMatching={this.props.onTabMatching} />
                </div>
                <InfoBar/>
            </div>
        );
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
    panelIndex: state.profileUI.panelIndex
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        onTabMain: showProfileMain,
        onTabMatching: showMatchingList
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
