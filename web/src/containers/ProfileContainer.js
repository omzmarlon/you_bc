import React from 'react';
import ProfileTabBar from '../components/profile/ProfileTabBar';
import NavHeader from '../components/common/NavHeader';
import {PRIMARY_GREEN} from "../styles/constants/colors";

const ProfileContainer = () => {
    return (
        <div>
            <NavHeader
                title={"个人主页"}
                color={PRIMARY_GREEN}
            />
            <ProfileTabBar onTabMain={()=>{}} onTabMatching={()=>{}} />
        </div>
    );
};

export default ProfileContainer;