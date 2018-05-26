import React from 'react';
import PropTypes from 'prop-types';
import NavHeader from "../common/NavHeader";
import {PRIMARY_GREEN} from "../../styles/constants/colors";
import {connect} from 'react-redux';

const ProfileNavHeader = (props) => (
    <NavHeader title={props.title} color={PRIMARY_GREEN}/>
);

ProfileNavHeader.propTypes = {
    title: PropTypes.string.isRequired
};

const mapStateToProps = (state, ownProps) => {
    let title = '';
    if (state.profileUI.panelIndex === 0) {
        title = "My Profile";
    } else if (state.profileUI.panelIndex === 1) {
        title = 'Matched With You';
    }
    return { title }
};

export default connect(mapStateToProps)(ProfileNavHeader);
