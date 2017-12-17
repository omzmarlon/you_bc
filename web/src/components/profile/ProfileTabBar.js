import React from 'react';
import PropTypes from 'prop-types';
import Home from 'material-ui/svg-icons/action/home';
import Recent from 'material-ui/svg-icons/action/query-builder';
import FlatButton from 'material-ui/FlatButton';
import "./ProfileTabBar.less";

const ProfileTabBar = () => {
    return (
        <div className={'tab-bar'}>
            <FlatButton className={'tab-bar-button'}>
                <Home className={'tab-bar-icon'} />
                <span className={'tab-bar-label'}>主页</span>
            </FlatButton>
            <FlatButton className={'tab-bar-button'}>
                <Recent className={'tab-bar-icon'}/>
                <span className={'tab-bar-label'}>已匹配</span>
            </FlatButton>
        </div>
    );
};

ProfileTabBar.propTypes = {
    onTabMain: PropTypes.func.isRequired,
    onTabMatching: PropTypes.func.isRequired
};

export default ProfileTabBar;
