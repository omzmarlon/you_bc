'use strict';
// libs
import React, {Component} from 'react'

import avatar1 from '../../public/images/us_03.png'
import avatar2 from '../../public/images/us_06.png'
import avatar3 from '../../public/images/us_08.png'
import avatar4 from '../../public/images/us_10.png'
import MainListTemplate from "../components/mainlist/MainListTemplate";
import { PRIMARY_YELLOW, SECONDARY_YELLOW } from "../styles/constants/colors";

const hardCodeData = [
    {
        avatar: avatar4,
        name: '红烧肉',
        gender: 'female',
        age: 19,
        constellation: '白羊座',
        faculty: 'Sauder',
        year: '一年级',
        relationship: '单身',
        motto: '人生就是不停的吃吃喝喝',
        hobbies: ['跑步', '音乐', '登山']
    },
    {
        avatar: avatar2,
        name: '艾窝窝',
        gender: 'male',
        age: 20,
        constellation: '水瓶座',
        faculty: 'Science',
        year: '三年级',
        relationship: '单身',
        motto: '人生就是不停的吃吃喝喝',
        hobbies: ['跑步', '音乐', '登山']
    },
    {
        avatar: avatar1,
        name: '驴打滚',
        matchRate: 0.8,
        gender: 'female',
        age: 20,
        constellation: '处女座',
        faculty: 'Land and Food',
        year: '一年级',
        relationship: '单身',
        motto: '人生就是不停的吃吃喝喝',
        hobbies: ['跑步', '音乐', '登山']
    },
    {
        avatar: avatar3,
        name: '麻花',
        matchRate: 0.8,
        gender: 'female',
        age: 20,
        constellation: '处女座',
        faculty: 'Arts',
        year: '一年级',
        relationship: '单身',
        motto: '人生就是不停的吃吃喝喝',
        hobbies: ['跑步', '音乐', '登山']
    }
];

class FriendContainer extends Component {
    render() {
        return(
            <MainListTemplate
                title="找X友"
                themeColor={PRIMARY_YELLOW}
                subThemeColor={SECONDARY_YELLOW}
                userData={hardCodeData}
            />
        )
    }
}

export default FriendContainer;