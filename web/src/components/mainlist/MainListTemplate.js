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
    AddressInfo, CourseInfo, FacultyInfo, HobbyInfo, HometownInfo, MajorInfo, MottoInfo, RelationshipInfo,
    StudyAbilityInfo,
    StudyRequirementInfo,
} from './ContentLists';
// assets
import HappyFaceImg from '../../components/common/svg/HappyFaceImg'
import CryFaceImg from '../../components/common/svg/CryFaceImg'
// styles
import './MainListTemplate.less'


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
    constructor(props) {
        super(props);
        this.state = {
            displayUsers: []
        };
        this.cardUpdateHandler = this.cardUpdateHandler.bind(this);
    }

    // get data
    componentDidMount() {
        this.setState({
            displayUsers: this.props.userData.slice(0, 3)
        });
    }

    // handle card swiped
    cardUpdateHandler(index) {
        this.setState({
            displayUsers: [
                ...this.state.displayUsers.slice(0, index),
                ...this.state.displayUsers.slice(index+1, 3),
                this.props.userData[3] // TODO: how to handle the user list? keep looping? what if run out of users?
            ]
        });
    }

    render() {
        return(
            <div className="main-list-container">
                <MainListHeader title={this.props.title} color={this.props.themeColor}/>
                <TransitionGroup className="main-list-card-list">
                    {this.state.displayUsers.map(
                        (user, index) => (
                            <CardTransition key={user.name}>
                                <div className="main-list-row-wrapper">
                                    <span className="--smile">{<HappyFaceImg />}</span>
                                    <span className="--cry">{<CryFaceImg />}</span>
                                    <Slidable
                                        onFullSwipe={() => this.cardUpdateHandler(index)}
                                        element={
                                            <div className="main-list-card-list-item">
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
                                                        (user.description && <StudyAbilityInfo description={user.description}/>),
                                                        (user.requirements && <StudyRequirementInfo color={this.props.themeColor} secondColor={this.props.subThemeColor} requirements={user.requirements}/>),
                                                        (user.motto && <MottoInfo color={this.props.themeColor} motto={user.motto}/>),
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
            </div>
        )
    }
}

MainListTemplate.propTypes = {
    title: PropTypes.string.isRequired,
    themeColor: PropTypes.string.isRequired,
    subThemeColor: PropTypes.string.isRequired,
    userData: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default MainListTemplate;