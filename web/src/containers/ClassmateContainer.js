'use strict';
// libs
import React, {Component} from 'react'
import MainListTemplate from "../components/mainlist/MainListTemplate";
// assets
import avatar1 from '../../public/images/us_03.png'
import avatar2 from '../../public/images/us_06.png'
import avatar3 from '../../public/images/us_08.png'
import avatar4 from '../../public/images/us_10.png'
// styles
import { PRIMARY_RED, SECONDARY_RED } from '../styles/constants/colors'
import './ClassmateContainer.less'

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
        studyAbility: '我是一个学霸',
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
        studyAbility: '我是一个学霸',
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
        studyAbility: '我是一个学霸',
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
        studyAbility: '我是一个学霸',
        requirements: ['自习', '上课', '同桌']
    }
];

class ClassmateContainer extends Component {
    render() {
        return(
            <MainListTemplate
                title="找课友"
                themeColor={PRIMARY_RED}
                subThemeColor={SECONDARY_RED}
                userData={hardCodeData}
            />
        )
    }
}

export default ClassmateContainer;