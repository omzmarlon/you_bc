'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import InfoRow from '../common/InfoRow';
import MajorIcon from "../common/svg/MajorIcon";
import TruncateText from "../common/TruncateText";

import CourseIcon from "../common/svg/CourseIcon";
import LocationIcon from "../common/svg/LocationIcon";
import HometownIcon from "../common/svg/HometownIcon";
import MottoIcon from "../common/svg/MottoIcon";
import FacultyIcon from "../common/svg/FacultyIcon";
import RelationshipIcon from "../common/svg/RelationshipIcon";

import TagIcon from "../common/svg/TagIcon";
import TruncateTags from "../common/TruncateTags";

const iconStyle = {
    width: 15,
    height: 15
};

// classmates
export const MajorInfo = (props) => (
    <InfoRow
        leftElement={
            <InfoRow
                leftElement={<MajorIcon style={{...iconStyle, ...{color: props.color}}}/>}
                rightElement={<span style={{paddingLeft: 3}}>Major:</span>}
            />
        }
        rightElement={<span style={{paddingLeft: 8}}>{props.major}</span>}
        // TODO should have year level
        // rightElement={<span style={{paddingLeft: 8}}>{props.major} {props.year}</span>}
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
                rightElement={<span style={{paddingLeft: 3}}>Courses:</span>}
            />
        }
        rightElement={
            <TruncateTags modalTitle="Courses" tags={props.courses} color={props.color} secondColor={props.secondColor}/>
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
        leftElement={
            <InfoRow
                leftElement={<MottoIcon style={{...iconStyle, ...{color: props.color}}}/>}
                rightElement={<span style={{paddingLeft: 3}}>Ability:</span>}
            />
        }
        rightElement={<TruncateText style={{paddingLeft: 8}} text={props.studyAbility} modalTitle={"Study Ability"}/>}
    />
);
StudyAbilityInfo.propTypes = {
    color: PropTypes.string.isRequired,
    studyAbility: PropTypes.string.isRequired
};

export const StudyRequirementInfo = (props) => (
    <InfoRow
        leftElement={
            <InfoRow
                leftElement={<TagIcon style={{...iconStyle, ...{color: props.color}}}/>}
                rightElement={<span style={{paddingLeft: 3}}>Lets:</span>}
            />
        }
        rightElement={
            <TruncateTags modalTitle="Let's" tags={props.requirements} color={props.color} secondColor={props.secondColor}/>
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
        leftElement={
            <InfoRow
                leftElement={<LocationIcon style={{color: props.color, height: 16, width: 14}}/>}
                rightElement={<span style={{paddingLeft: 3}}>Location:</span>}
            />
        }
        rightElement={<span style={{paddingLeft: 8}}>{props.address}</span>}
    />
);
AddressInfo.propTypes = {
    color: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired
};

export const HometownInfo = (props) => (
    <InfoRow
        leftElement={
            <InfoRow
                leftElement={<HometownIcon style={{...iconStyle, ...{color: props.color}}} />}
                rightElement={<span style={{paddingLeft: 3}}>Hometown:</span>}
            />
        }
        rightElement={<span style={{paddingLeft: 8}}>{props.city}</span>}
    />
);
HometownInfo.propTypes = {
    country: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
};

// Friends Motto
export const MottoInfo = (props) => (
    <InfoRow
        leftElement={
            <InfoRow
                leftElement={
                    <MottoIcon style={{...iconStyle, ...{color: props.color}}} />
                }
                rightElement={
                    <span style={{paddingLeft: 3}}>Life Motto</span>
                }
            />
        }
        rightElement={<TruncateText style={{paddingLeft: 8}} text={props.motto} modalTitle="Life Motto"/>}
    />
);
MottoInfo.propTypes = {
    color: PropTypes.string.isRequired,
    motto: PropTypes.string.isRequired
};

// Roommates self-description
export const SelfDescription = (props) => (
    <InfoRow
        leftElement={
            <InfoRow
                leftElement={
                    <MottoIcon style={{...iconStyle, ...{color: props.color}}} />
                }
                rightElement={
                    <span style={{paddingLeft: 3}}>About Me:</span>
                }
            />
        }
        rightElement={<TruncateText style={{paddingLeft: 8}} text={props.description} modalTitle="About Me"/>}
    />
);

SelfDescription.propTypes = {
    color: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
};


// friends hobby
export const HobbyInfo = (props) => (
    <InfoRow
        leftElement={
            <InfoRow
                leftElement={<TagIcon style={{...iconStyle, ...{color: props.color}}}/>}
                rightElement={<span style={{paddingLeft: 3}}>Interests:</span>}
            />
        }
        rightElement={
            <TruncateTags modalTitle="Interests" tags={props.hobbies} color={props.color} secondColor={props.secondColor}/>
        }
    />
);
HobbyInfo.propTypes = {
    color: PropTypes.string.isRequired,
    secondColor: PropTypes.string.isRequired,
    hobbies: PropTypes.arrayOf(PropTypes.string).isRequired
};

// roommates life habit
export const LifeHabit = (props) => (
    <InfoRow
        leftElement={
            <InfoRow
                leftElement={<TagIcon style={{...iconStyle, ...{color: props.color}}}/>}
                rightElement={<span style={{paddingLeft: 3}}>Habits:</span>}
            />
        }
        rightElement={
            <TruncateTags modalTitle="Habits" tags={props.habits} color={props.color} secondColor={props.secondColor}/>
        }
    />
);
LifeHabit.propTypes = {
    color: PropTypes.string.isRequired,
    secondColor: PropTypes.string.isRequired,
    habits: PropTypes.arrayOf(PropTypes.string).isRequired
};


// friends
export const FacultyInfo = (props) => (
    <InfoRow
        leftElement={
            <InfoRow
                leftElement={
                    <FacultyIcon style={{...iconStyle, ...{color: props.color}}}/>
                }
                rightElement={
                    <span style={{paddingLeft: 3}}>Faculty:</span>
                }
            />
        }
        rightElement={<span style={{paddingLeft: 8}}>{props.faculty}</span>}
        //TODO: should have year
        // rightElement={<span style={{paddingLeft: 8}}>{props.faculty} {props.year}</span>}
    />
);
FacultyInfo.propTypes = {
    color: PropTypes.string.isRequired,
    faculty: PropTypes.string.isRequired,
    year: PropTypes.string
};

export const RelationshipInfo = (props) => (
    <InfoRow
        leftElement={
            <InfoRow
                leftElement={
                    <RelationshipIcon style={{color: props.color, height: 16, width: 16}}/>
                }
                rightElement={
                    <span style={{paddingLeft: 3}}>Relationship:</span>
                }
            />
        }
        rightElement={<span style={{paddingLeft: 8}}>{props.relationship}</span>}
    />
);
RelationshipInfo.propTypes = {
    color: PropTypes.string.isRequired,
    relationship: PropTypes.string.isRequired
};
