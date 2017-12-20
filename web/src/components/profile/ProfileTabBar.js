import React from 'react';
import PropTypes from 'prop-types';
import Home from 'material-ui/svg-icons/action/home';
import Recent from 'material-ui/svg-icons/action/query-builder';
import FlatButton from 'material-ui/FlatButton';
import "./ProfileTabBar.less";
import {defaultIconSize} from '../../styles/material/iconStyles';
import {PRIMARY_GREEN} from "../../styles/constants/colors";

const buttonSize = {
    height: '100%',
    width: '50%'
};

const buttonLayout = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
};

const buttonStyles = Object.assign({}, buttonSize, buttonLayout);

const ProfileTabBar = () => {
    return (
        <div className={'tab-bar'}>
            <FlatButton style={buttonStyles}>
                <Home style={defaultIconSize} color={PRIMARY_GREEN} />
                <span className={'tab-bar-label'}>主页</span>
            </FlatButton>
            <FlatButton style={buttonStyles}>
                <Recent style={defaultIconSize} color={PRIMARY_GREEN} />
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
