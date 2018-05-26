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
import {PRIMARY_BLUE, PRIMARY_GREEN, PRIMARY_RED, PRIMARY_WHITE, LIGHT_GREY} from "../../styles/constants/colors";
import InfoRow from "../common/InfoRow";

const MainListHeader = (props) => (
    <NavHeader
        title={props.title}
        color={props.color}
        iconRight={
            <IconMenu
                iconButtonElement={<IconButton><FilterIcon color={PRIMARY_WHITE}/></IconButton>}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                onItemClick={props.genderFilter}
            >
                <MenuItem
                    key="male"
                    style={props.seleted === "male" ? {backgroundColor: LIGHT_GREY}: {}}
                    primaryText={
                        <InfoRow
                            leftElement={<MaleIcon color={PRIMARY_BLUE}/>}
                            rightElement={<span style={{paddingLeft: 8}}>Male</span>}
                        />
                    }
                />
                <MenuItem
                    key="female"
                    style={props.seleted === "female" ? {backgroundColor: LIGHT_GREY}: {}}
                    primaryText={
                        <InfoRow
                            leftElement={<FemaleIcon color={PRIMARY_RED}/>}
                            rightElement={<span style={{paddingLeft: 8}}>Female</span>}
                        />
                    }
                />
                <MenuItem
                    key="mix"
                    style={props.seleted === "mix" ? {backgroundColor: LIGHT_GREY}: {}}
                    primaryText={
                        <InfoRow
                            leftElement={<MixGenderIcon color={PRIMARY_GREEN}/>}
                            rightElement={<span style={{paddingLeft: 8}}>Mix</span>}
                        />
                    }
                />
            </IconMenu>
        }
    />
);

MainListHeader.propTypes = {
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]).isRequired,
    color: PropTypes.string.isRequired,
    genderFilter: PropTypes.func.isRequired,
    seleted: PropTypes.string.isRequired
};

export default MainListHeader;