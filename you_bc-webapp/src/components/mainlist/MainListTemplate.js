'use strict';
// libs
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
// components
import MainListHeader from './MainListHeader'
import SearchResultCard from '../../components/common/card/SearchResultCard'
import Slidable from '../../components/common/Slidable'
import {
    AddressInfo, CourseInfo, FacultyInfo, HobbyInfo, HometownInfo, LifeHabit, MajorInfo, MottoInfo, RelationshipInfo,
    SelfDescription,
    StudyAbilityInfo,
    StudyRequirementInfo,
} from './ContentLists';
// assets
import HappyFaceImg from '../../components/common/svg/HappyFaceImg'
import CryFaceImg from '../../components/common/svg/CryFaceImg'
// styles
import './MainListTemplate.less'
import FormGroup from "../profile/contents/FormGroup";

const CardTransition = ({ children, ...props }) => (
    <CSSTransition
        {...props}
        timeout={{enter:800, exit: 1}}
        classNames="card"
    >
        {children}
    </CSSTransition>
);

class MainListTemplate extends Component {
    render() {
        return(
            <div className="main-list-container">
                <MainListHeader
                    title={this.props.title}
                    color={this.props.themeColor}
                    genderFilter={this.props.genderFilter}
                    seleted={this.props.currentGender}
                />
                <TransitionGroup className="main-list-card-list">
                    {this.props.userList.map(
                        (user, index) => (
                            <CardTransition key={user.name}>
                                <div className="main-list-row-wrapper">

                                    <Slidable
                                        shouldGoBack={this.props.shouldCardGoBack}
                                        onFullSwipe={deltaX => this.props.onUserSwiped(index, deltaX)}
                                        element={
                                            <div className="main-list-card-list-item">
                                                <span className="--smile">{<HappyFaceImg />}</span>
                                                <span className="--cry">{<CryFaceImg />}</span>
                                                <SearchResultCard
                                                    avatar={user.avatar}
                                                    name={user.name}
                                                    gender={user.gender}
                                                    age={user.age}
                                                    constellation={user.constellation}
                                                    matchRate={user.matchRate}
                                                    matchRateColor={this.props.themeColor}
                                                    contentList={[
                                                        (user.major && <MajorInfo color={this.props.themeColor} major={user.major} year={user.year}/>),
                                                        (user.address && <AddressInfo color={this.props.themeColor} address={user.address}/>),
                                                        (user.faculty && <FacultyInfo color={this.props.themeColor} faculty={user.faculty} year={user.year}/>),
                                                        (user.courses && <CourseInfo color={this.props.themeColor} secondColor={this.props.subThemeColor} courses={user.courses}/>),
                                                        (user.country && <HometownInfo color={this.props.themeColor} city={user.city} country={user.country}/>),
                                                        (user.relationship && <RelationshipInfo color={this.props.themeColor} relationship={user.relationship}/>),
                                                        (user.studyAbility && <StudyAbilityInfo color={this.props.themeColor} studyAbility={user.studyAbility}/>),
                                                        (user.requirements && <StudyRequirementInfo color={this.props.themeColor} secondColor={this.props.subThemeColor} requirements={user.requirements}/>),
                                                        (user.motto && <MottoInfo color={this.props.themeColor} motto={user.motto}/>), // friends
                                                        (user.selfDescription && <SelfDescription color={this.props.themeColor} description={user.selfDescription}/>), // roommates
                                                        (user.lifeHabits && <LifeHabit color={this.props.themeColor} secondColor={this.props.subThemeColor} habits={user.lifeHabits}/>), // roommates
                                                        (user.hobbies && <HobbyInfo hobbies={user.hobbies} color={this.props.themeColor} secondColor={this.props.subThemeColor}/>)
                                                    ]}
                                                />
                                            </div>
                                        }
                                    />
                                </div>
                            </CardTransition>
                        )
                    )}
                </TransitionGroup>
                {this.props.userList.length === 0 && <div className="no-more-user">No More Users</div>}
                <FormGroup/>
            </div>
        )
    }
}

MainListTemplate.propTypes = {
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]).isRequired,
    themeColor: PropTypes.string.isRequired,
    subThemeColor: PropTypes.string.isRequired,
    userList: PropTypes.arrayOf(PropTypes.object).isRequired,
    onUserSwiped: PropTypes.func.isRequired,
    genderFilter: PropTypes.func.isRequired,
    shouldCardGoBack: PropTypes.bool,
    currentGender: PropTypes.string.isRequired
};

export default MainListTemplate;