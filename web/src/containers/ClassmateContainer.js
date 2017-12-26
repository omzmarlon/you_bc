'use strict';
// libs
import React, {Component} from 'react'
// components
import NavHeader from '../components/common/NavHeader'
import SearchResultCard from '../components/common/card/SearchResultCard'
import Slidable from '../components/common/Slidable'
import InfoRow from '../components/common/InfoRow'
import Tag from '../components/common/Tag'
import TruncateText from "../components/common/TruncateText"
import IconMenu from "material-ui/IconMenu"
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'

// assets
import avatar1 from '../../public/images/us_03.png'
import avatar2 from '../../public/images/us_06.png'
import avatar3 from '../../public/images/us_08.png'
import avatar4 from '../../public/images/us_10.png'
import FilterIcon from '../components/common/svg/FilterIcon'
import MajorIcon from '../components/common/svg/MajorIcon'
import CourseIcon from '../components/common/svg/CourseIcon'
import FemaleIcon from '../components/common/svg/FemaleIcon'
import MaleIcon from '../components/common/svg/MaleIcon'
import MixGenderIcon from '../components/common/svg/MixGenderIcon'
// styles
import {PRIMARY_BLUE, PRIMARY_GREEN, PRIMARY_RED, PRIMARY_WHITE, SECONDARY_RED} from '../styles/constants/colors'
import './ClassmateContainer.less'

const hardCodeData = [
    {
        avatar: avatar1,
        name: '驴打滚',
        gender: 'male',
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

class ClassmateContainer extends Component {
    // state: 1. all data; 2. current three ones to display
    constructor(props) {
        super(props);
        this.state = {
            userPool: [],
            displayUsers: []
        };
    }

    // get data
    componentDidMount() {
        this.setState({
            userPool: hardCodeData,
            displayUsers: hardCodeData.slice(0, 3)
        });
    }

    render() {
        return(
            <div className="classmate-container">
                <NavHeader
                    title={"找课友"}
                    color={PRIMARY_RED}
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
                    iconRightAction={() => {}}
                />
                <div className="classmate-card-list">
                    {this.state.displayUsers.map(
                        (user, index) => (
                            <Slidable
                                key={index}
                                onFullSwipe={() => {}}
                                element={
                                    <div className="classmate-card-list-item">
                                        <SearchResultCard
                                            avatar={user.avatar}
                                            name={user.name}
                                            gender={user.gender}
                                            age={user.age}
                                            constellation={user.constellation}
                                            matchRate={user.matchRate}
                                            matchRateColor={PRIMARY_RED}
                                            contentList={[
                                                {
                                                    leftElement: <InfoRow
                                                        leftElement={<MajorIcon style={iconStyle}/>}
                                                        rightElement={<span style={{paddingLeft: 3}}>专业:</span>}
                                                    />,
                                                    rightElement: <span style={{paddingLeft: 8}}>{user.major} {user.year}</span>
                                                },
                                                {
                                                    leftElement: <InfoRow
                                                        leftElement={<CourseIcon style={iconStyle}/>}
                                                        rightElement={<span style={{paddingLeft: 3}}>课程: </span>}
                                                    />,
                                                    rightElement: <span className="card-list-item-tags">
                                                                {user.courses.map(course =>
                                                                    <div key={course} className="--tag">
                                                                        <Tag
                                                                            text={course}
                                                                            bkgColor={SECONDARY_RED}
                                                                            textColor={PRIMARY_RED}
                                                                        />
                                                                    </div>)}
                                                              </span>
                                                },
                                                {
                                                    leftElement: <span>自我描述:</span>,
                                                    rightElement: <TruncateText style={{paddingLeft: 8}} text={user.description}/>
                                                },
                                                {
                                                    leftElement: <span>一起: </span>,
                                                    rightElement: <span className="card-list-item-tags">
                                                                {user.requirements.map(req =>
                                                                    <div key={req} className="--tag">
                                                                        <Tag
                                                                            text={req}
                                                                            bkgColor={SECONDARY_RED}
                                                                            textColor={PRIMARY_RED}
                                                                        />
                                                                    </div>)}
                                                              </span>
                                                }
                                            ]}
                                        />
                                    </div>
                                }
                            />
                        )
                    )}
                </div>
            </div>
        )
    }
}

export default ClassmateContainer;