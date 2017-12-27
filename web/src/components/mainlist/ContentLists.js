'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import InfoRow from '../common/InfoRow';
import MajorIcon from "../common/svg/MajorIcon";
import Tag from "../common/Tag";
import TruncateText from "../common/TruncateText";

import CourseIcon from "../common/svg/CourseIcon";
import LocationIcon from "../common/svg/LocationIcon";
import HometownIcon from "../common/svg/HometownIcon";
import MottoIcon from "../common/svg/MottoIcon";
import FacultyIcon from "../common/svg/FacultyIcon";
import RelationshipIcon from "../common/svg/RelationshipIcon";

import './ContentLists.less';

const iconStyle = {
    width: 14,
    height: 14
};

// classmates
export const MajorInfo = (props) => (
    <InfoRow
        leftElement={
            <InfoRow
                leftElement={<MajorIcon style={{...iconStyle, ...{color: props.color}}}/>}
                rightElement={<span style={{paddingLeft: 3}}>专业:</span>}
            />
        }
        rightElement={
            <span style={{paddingLeft: 8}}>{props.major} {props.year}</span>
        }
    />
);
MajorInfo.propTypes = {
    color: PropTypes.string.isRequired,
    major: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired
};

export const CourseInfo = (props) => (
    <InfoRow
        leftElement={
            <InfoRow
                leftElement={<CourseIcon style={{...iconStyle, ...{color: props.color}}}/>}
                rightElement={<span style={{paddingLeft: 3}}>课程:</span>}
            />
        }
        rightElement={
            <span className="content-list-item-tags">
                {props.courses.map(course =>
                    <div key={course} className="--tag">
                        <Tag text={course} bkgColor={props.secondColor} textColor={props.color}/>
                    </div>)}
            </span>
        }
    />
);
CourseInfo.propTypes = {
    courses: PropTypes.arrayOf(PropTypes.string).isRequired,
    color: PropTypes.string.isRequired,
    secondColor: PropTypes.string.isRequired
};

export const StudyAbilityInfo = (props) => (
    <InfoRow
        leftElement={<span>自我描述:</span>}
        rightElement={<TruncateText style={{paddingLeft: 8}} text={props.description}/>}
    />
);
StudyAbilityInfo.propTypes = {
    description: PropTypes.string.isRequired
};

export const StudyRequirementInfo = (props) => (
    <InfoRow
        leftElement={<span>一起:</span>}
        rightElement={
            <span className="content-list-item-tags">
                {props.requirements.map(req =>
                    <div key={req} className="--tag">
                        <Tag text={req} bkgColor={props.secondColor} textColor={props.color} />
                    </div>)}
            </span>
        }
    />
);
StudyRequirementInfo.propTypes = {
    color: PropTypes.string.isRequired,
    secondColor: PropTypes.string.isRequired,
    requirements: PropTypes.arrayOf(PropTypes.string).isRequired
};

// roommates
export const AddressInfo = (props) => (
    <InfoRow
        leftElement={<LocationIcon style={{...iconStyle, ...{color: props.color}}}/>}
        rightElement={<span style={{paddingLeft: 8}}>{props.address}</span>}
    />
);
AddressInfo.propTypes = {
    color: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired
};

export const HometownInfo = (props) => (
    <InfoRow
        leftElement={<HometownIcon style={{...iconStyle, ...{color: props.color}}} />}
        rightElement={<span style={{paddingLeft: 8}}>{props.country} {props.city}</span>}
    />
);
HometownInfo.propTypes = {
    country: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
};

export const MottoInfo = (props) => (
    <InfoRow
        leftElement={<MottoIcon style={{...iconStyle, ...{color: props.color}}} />}
        rightElement={<TruncateText style={{paddingLeft: 8}} text={props.motto}/>}
    />
);
MottoInfo.propTypes = {
    color: PropTypes.string.isRequired,
    motto: PropTypes.string.isRequired
};

export const HobbyInfo = (props) => (
    <InfoRow
        leftElement={<span>兴趣:</span>}
        rightElement={
            <span className="content-list-item-tags">
                {props.hobbies.map(hobby =>
                    <div key={hobby} className="--tag">
                        <Tag text={hobby} bkgColor={props.secondColor} textColor={props.color} />
                    </div>)}
            </span>
        }
    />
);
HobbyInfo.propTypes = {
    color: PropTypes.string.isRequired,
    secondColor: PropTypes.string.isRequired,
    hobbies: PropTypes.arrayOf(PropTypes.string).isRequired
};

// friends
export const FacultyInfo = (props) => (
    <InfoRow
        leftElement={
            <FacultyIcon style={{...iconStyle, ...{color: props.color}}}/>
        }
        rightElement={
            <span style={{paddingLeft: 8}}>{props.faculty} {props.year}</span>
        }
    />
);
FacultyInfo.propTypes = {
    color: PropTypes.string.isRequired,
    faculty: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired
};

export const RelationshipInfo = (props) => (
    <InfoRow
        leftElement={<RelationshipIcon style={{...iconStyle, ...{color: props.color}}}/>}
        rightElement={<span style={{paddingLeft: 8}}>{props.relationship}</span>}
    />
);
RelationshipInfo.propTypes = {
    color: PropTypes.string.isRequired,
    relationship: PropTypes.string.isRequired
};
