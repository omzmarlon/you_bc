'use strict';
// libs
import React, {Component} from 'react'
import MainListTemplate from '../components/mainlist/MainListTemplate';

import avatar1 from '../../public/images/us_03.png'
import avatar2 from '../../public/images/us_06.png'
import avatar3 from '../../public/images/us_08.png'
import avatar4 from '../../public/images/us_10.png'
import {PRIMARY_BLUE, SECONDARY_BLUE } from "../styles/constants/colors";

const hardCodeData = [
    {
        avatar: avatar4,
        name: '红烧肉',
        gender: 'female',
        age: 20,
        constellation: '处女座',
        address: 'Vancouver',
        country: '中国',
        city: '重庆',
        motto: '人生就是不停的吃吃喝喝',
        hobbies: ['跑步', '音乐', '登山']
    },
    {
        avatar: avatar1,
        name: '驴打滚',
        gender: 'female',
        age: 23,
        constellation: '天蝎座',
        matchRate: 0.8,
        address: 'West Vancouver',
        country: '中国',
        city: '华西村',
        motto: '人生就是不停的吃吃喝喝',
        hobbies: ['跑步', '音乐', '登山']
    },
    {
        avatar: avatar2,
        name: '艾窝窝',
        gender: 'male',
        age: 23,
        constellation: '天蝎座',
        address: 'Richmond',
        country: '中国',
        city: '北京',
        motto: '人生就是不停的吃吃喝喝',
        hobbies: ['跑步', '音乐', '登山']
    },
    {
        avatar: avatar3,
        name: '麻花',
        gender: 'male',
        age: 23,
        constellation: '天蝎座',
        matchRate: 0.8,
        address: 'UBC',
        country: '中国',
        city: '三里屯',
        motto: '人生就是不停的吃吃喝喝',
        hobbies: ['跑步', '音乐', '登山']
    }
];

class RoommateContainer extends Component {
    render() {
        return(
            <MainListTemplate
                title="找室友"
                themeColor={PRIMARY_BLUE}
                subThemeColor={SECONDARY_BLUE}
                userData={hardCodeData}
            />
        )
    }
}

export default RoommateContainer;