import React from 'react';
import PropTypes from 'prop-types';
import Home from 'material-ui/svg-icons/action/home';
import Recent from 'material-ui/svg-icons/action/query-builder';
import FlatButton from 'material-ui/FlatButton';
import "./ProfileTabBar.less";
import {PRIMARY_GREEN} from "../../styles/constants/colors";

const buttonSize = {
    height: '100%',
    width: '50%'
};

const ProfileTabBar = (props) => {
    return (
        <div className={'tab-bar'}>
            <FlatButton style={buttonSize}
                        onClick={props.onTabMain}
                        label={'主页'}
                        icon={<Home color={PRIMARY_GREEN} />}
                        labelStyle={{color: 'white'}}
            />
            <FlatButton style={buttonSize}
                        onClick={props.onTabMatching}
                        icon={<Recent color={PRIMARY_GREEN} />}
                        label={'已匹配'}
                        labelStyle={{color: 'white'}}
            />
        </div>
    );
};

ProfileTabBar.propTypes = {
    onTabMain: PropTypes.func.isRequired,
    onTabMatching: PropTypes.func.isRequired
};

export default ProfileTabBar;
