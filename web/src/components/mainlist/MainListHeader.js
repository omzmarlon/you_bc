'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import NavHeader from "../common/NavHeader";
import {IconMenu} from "material-ui/IconMenu";
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';

import FemaleIcon from '../../components/common/svg/FemaleIcon';
import MaleIcon from '../../components/common/svg/MaleIcon';
import MixGenderIcon from '../../components/common/svg/MixGenderIcon';
import FilterIcon from "../common/svg/FilterIcon";
import {PRIMARY_BLUE, PRIMARY_GREEN, PRIMARY_RED, PRIMARY_WHITE} from "../../styles/constants/colors";

const MainListHeader = (props) => (
    <NavHeader
        title={props.title}
        color={props.color}
        iconRight={
            <IconMenu
                iconButtonElement={<IconButton><FilterIcon color={PRIMARY_WHITE}/></IconButton>}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
            >
                <MenuItem primaryText={<MaleIcon color={PRIMARY_BLUE}/>} />
                <MenuItem primaryText={<FemaleIcon color={PRIMARY_RED}/>} />
                <MenuItem primaryText={<MixGenderIcon color={PRIMARY_GREEN}/>} />
            </IconMenu>
        }
    />
);

MainListHeader.propTypes = {
    title: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
};

export default MainListHeader;