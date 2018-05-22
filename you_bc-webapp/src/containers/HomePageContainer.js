'use strict';
// libs
import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
// styles
import "./HomePageContainer.less";
import {PRIMARY_BLUE, PRIMARY_RED, PRIMARY_YELLOW} from "../styles/constants/colors";
// components
import Block from "../components/homePage/Block";
import FloatingActionButton from "material-ui/FloatingActionButton";
import Badge from "material-ui/Badge";
import PokeEgg from "../../public/images/poke_egg.png";
// constants
import {TO_CLASSMATES, TO_FRIENDS, TO_PROFILE, TO_ROOMMATES} from "../constants/api";
import {
    fetchClassmatesInfo,
    fetchFriendsInfo,
    fetchMatchedUsers,
    fetchPersonalInfo,
    fetchRoommatesInfo
} from "../actions/profile/profileFetchActions";
import RollingEmoji from "../components/common/RollingEmoji";

const ProfileButton = () => (
    <FloatingActionButton className={'profile-button'}>
        <img src={PokeEgg} className="profile-icon"/>
        <span className={'to-profile-label'}>My Profile</span>
    </FloatingActionButton>
);

class HomePageContainer extends Component {

    componentDidMount() {
        const { dispatch } = this.props;
        // todo: call these so that users info are fetch(instead of waiting until going to profile page)
        // todo: but do we need a loading component?
        dispatch(fetchClassmatesInfo());
        dispatch(fetchFriendsInfo());
        dispatch(fetchRoommatesInfo());
        dispatch(fetchPersonalInfo());
        dispatch(fetchMatchedUsers());
    }

    render() {
        return(
            <div className="home-page">
                <Block className="classmate-block" path={TO_CLASSMATES} displayName="Find Classmates" color={PRIMARY_RED}/>
                <Block className="friend-block" path={TO_FRIENDS} displayName={<RollingEmoji/>} color={PRIMARY_YELLOW}/>
                <Block className="roommate-block" path={TO_ROOMMATES} displayName="Find Roommates" color={PRIMARY_BLUE}/>
                <Link to={TO_PROFILE}>
                    {
                        this.props.newMatch > 0 ?
                            <Badge badgeContent={this.props.newMatch > 10 ? '10+' : this.props.newMatch}
                                   secondary={true}
                                   style={{position: 'fixed', bottom: '10%', right: '4%'}}
                            >
                                <ProfileButton/>
                            </Badge> :
                            <ProfileButton/>
                    }
                </Link>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    newMatch: state.profile.newMatch
});

export default connect(mapStateToProps)(HomePageContainer);