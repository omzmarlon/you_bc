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
                        label={'Profile'}
                        icon={<Home color={PRIMARY_GREEN} />}
                        labelStyle={{color: props.panelIndex===0?'white':'grey'}}
            />
            <FlatButton style={buttonSize}
                        onClick={props.onTabMatching}
                        icon={<Recent color={PRIMARY_GREEN} />}
                        label={'Matched'}
                        labelStyle={{color: props.panelIndex===1?'white':'grey'}}
            />
        </div>
    );
};

ProfileTabBar.propTypes = {
    panelIndex: PropTypes.number.isRequired,
    onTabMain: PropTypes.func.isRequired,
    onTabMatching: PropTypes.func.isRequired
};

export default ProfileTabBar;
