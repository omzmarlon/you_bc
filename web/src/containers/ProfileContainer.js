'use strict';
import React from 'react';
import PropTypes from 'prop-types';
// components
import ProfileTabBar from '../components/profile/ProfileTabBar';
import NavHeader from '../components/common/NavHeader';
import TextInput from "../components/common/form/TextInput";
//styles
import './ProfileContainer.less';
// colors
import {PRIMARY_GREEN} from "../styles/constants/colors";
// icons
import ProfileMain from "../components/profile/contents/ProfileMain";
import MatchingList from "../components/profile/contents/MatchingList";
// redux
import { connect }  from 'react-redux'
import { bindActionCreators } from 'redux';
import {showMatchingList, showProfileMain} from '../actions/profile/profileUIActions';
import {
    fetchClassmatesInfo, fetchFriendsInfo, fetchPersonalInfo,
    fetchRoommatesInfo
} from "../actions/profile/profileFetchActions";

class ProfileContainer extends React.Component {
    componentDidMount() {
        const { store } = this.context;
        store.dispatch(fetchClassmatesInfo());
        store.dispatch(fetchFriendsInfo());
        store.dispatch(fetchRoommatesInfo());
        store.dispatch(fetchPersonalInfo());
    }

    render() {
        return (
            <div>
                <NavHeader
                    title={"个人主页"}
                    color={PRIMARY_GREEN}/>
                <div className={'profile-container'} style={{overflow: 'scroll', height: '100%'}}>
                    { this.props.panelIndex === 0 && <ProfileMain /> }
                    { this.props.panelIndex === 1 && <MatchingList /> }
                    <ProfileTabBar onTabMain={this.props.onTabMain} onTabMatching={this.props.onTabMatching} />
                </div>
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
