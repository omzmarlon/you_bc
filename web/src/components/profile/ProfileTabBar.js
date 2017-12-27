import React from 'react';
import PropTypes from 'prop-types';
import Home from 'material-ui/svg-icons/action/home';
import Recent from 'material-ui/svg-icons/action/query-builder';
import FlatButton from 'material-ui/FlatButton';
import InfoRow from '../../components/common/InfoRow';
import "./ProfileTabBar.less";
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

const ProfileTabBar = (props) => {
    return (
        <div className={'tab-bar'}>
            <FlatButton style={buttonStyles} onClick={props.onTabMain}>
                <InfoRow
                    leftElement={<Home color={PRIMARY_GREEN} />}
                    rightElement={<span className={'tab-bar-label'}>主页</span>}
                />
            </FlatButton>
            <FlatButton style={buttonStyles} onClick={props.onTabMatching}>
                <InfoRow
                    leftElement={<Recent color={PRIMARY_GREEN} />}
                    rightElement={<span className={'tab-bar-label'}>已匹配</span>}
                />
            </FlatButton>
        </div>
    );
};

ProfileTabBar.propTypes = {
    onTabMain: PropTypes.func.isRequired,
    onTabMatching: PropTypes.func.isRequired
};

export default ProfileTabBar;
