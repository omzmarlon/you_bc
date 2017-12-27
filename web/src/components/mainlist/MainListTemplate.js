'use strict';
// libs
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
// components
import MainListHeader from './MainListHeader'
import SearchResultCard from '../../components/common/card/SearchResultCard'
import Slidable from '../../components/common/Slidable'
import {CourseInfo, MajorInfo, StudyAbilityInfo, StudyRequirementInfo,} from './ContentLists';
// assets
import HappyFaceImg from '../../components/common/svg/HappyFaceImg'
import CryFaceImg from '../../components/common/svg/CryFaceImg'
// styles
import {PRIMARY_BLUE, PRIMARY_GREEN, PRIMARY_RED, PRIMARY_WHITE, SECONDARY_RED} from '../styles/constants/colors'
import './MainListTemplate.less'

const hardCodeData = [
    {
        avatar: avatar1,
        name: '驴打滚',
        gender: 'female',
        age: 20,
        constellation: '处女座',
        matchRate: 0.8,
        major: 'Marketing',
        year: 'III',
        courses: ['COMM296', 'COMM294'],
        description: '我是一个学霸',
        requirements: ['自习', '上课', '同桌']
    },
    {
        avatar: avatar2,
        name: '艾窝窝',
        gender: 'male',
        age: 23,
        constellation: '天蝎座',
        major: 'Finance',
        year: 'IV',
        courses: ['COMM298', 'COMM488'],
        description: '我是一个学霸',
        requirements: ['自习', '上课']
    },
    {
        avatar: avatar3,
        name: '麻花',
        gender: 'female',
        age: 21,
        constellation: '处女座',
        matchRate: 0.8,
        major: 'Marketing',
        year: 'III',
        courses: ['COMM296', 'COMM294'],
        description: '我是一个学霸',
        requirements: ['自习', '上课', '同桌']
    },
    {
        avatar: avatar4,
        name: '红烧肉',
        gender: 'female',
        age: 19,
        constellation: '摩羯座',
        matchRate: 0.8,
        major: 'Marketing',
        year: 'V',
        courses: ['COMM296', 'COMM294'],
        description: '我是一个学霸',
        requirements: ['自习', '上课', '同桌']
    }
];

const iconStyle = {
    width: 14,
    height: 14,
    color: PRIMARY_RED
};

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
    // state: 1. all data; 2. current three ones to display
    constructor(props) {
        super(props);
        this.state = {
            userPool: [],
            displayUsers: []
        };
        this.cardUpdateHandler = this.cardUpdateHandler.bind(this);
    }

    // get data
    componentDidMount() {
        this.setState({
            userPool: hardCodeData,
            displayUsers: hardCodeData.slice(0, 3)
        });
    }

    // handle card swiped
    cardUpdateHandler(index) {
        this.setState({
            displayUsers: [
                ...this.state.displayUsers.slice(0, index),
                ...this.state.displayUsers.slice(index+1, 3),
                hardCodeData[3]
            ]
        });
    }

    render() {
        return(
            <div className="classmate-container">
                <MainListHeader title={this.props.title} color={this.props.themeColor}/>
                <TransitionGroup className="classmate-card-list">
                    {this.state.displayUsers.map(
                        (user, index) => (
                            <CardTransition key={user.name}>
                                <div className="classmate-row-wrapper">
                                    <span className="--smile">{<HappyFaceImg />}</span>
                                    <span className="--cry">{<CryFaceImg />}</span>
                                    <Slidable
                                        onFullSwipe={() => this.cardUpdateHandler(index)}
                                        element={
                                            <div className="classmate-card-list-item">
                                                <SearchResultCard
                                                    avatar={user.avatar}
                                                    name={user.name}
                                                    gender={user.gender}
                                                    age={user.age}
                                                    constellation={user.constellation}
                                                    matchRate={user.matchRate}
                                                    matchRateColor={this.props.themeColor}
                                                    contentList={[
                                                        <MajorInfo color={this.props.themeColor} major={user.major} year={user.year}/>,
                                                        <CourseInfo color={this.props.themeColor} secondColor={this.props.subThemeColor} courses={user.courses}/>,
                                                        <StudyAbilityInfo description={user.description}/>,
                                                        <StudyRequirementInfo color={this.props.themeColor} secondColor={this.props.subThemeColor} requirements={user.requirements}/>
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
    contentList: PropTypes.arrayOf(
        PropTypes.shape({
            leftElement: PropTypes.element,
            rightElement: PropTypes.element
        })
    ).isRequired
};

export default MainListTemplate;