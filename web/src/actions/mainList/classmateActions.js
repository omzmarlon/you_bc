/**
 * fetch data
 */
'use strict';

import * as ActionTypes from '../actionTypes';
import {showInfoBar} from "../global/globalActions";
// assets
import avatar1 from '../../../public/images/us_03.png'
import avatar2 from '../../../public/images/us_06.png'
import avatar3 from '../../../public/images/us_08.png'
import avatar4 from '../../../public/images/us_10.png'
import avatar5 from '../../../public/images/us_12.png'

const mockAPICall = quantity => {
    return new Promise((fulfill, reject) => {
        setTimeout(() => {
            if (quantity === 1) {
                fulfill({
                    mockData: [
                        // {
                        //     avatar: avatar5,
                        //     name: '北京烤鸭',
                        //     gender: 'female',
                        //     age: 20,
                        //     constellation: '处女座',
                        //     matchRate: 0.8,
                        //     major: 'Marketing',
                        //     year: 'III',
                        //     courses: ['COMM296', 'COMM294'],
                        //     studyAbility: '我是一个学霸',
                        //     requirements: ['自习', '上课', '同桌']
                        // }
                    ]
                });
            } else {
                fulfill({
                    mockData: [
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
                    ]
                });
            }
        }, 500);
    });
};

const mockPostAPI = () => {
    return new Promise((fulfill, reject) => {
        setTimeout(() => fulfill("liked!"), 500);
    });
};

/**
 * fetch data (Async Action)
 * @param quantity
 * @param gender (default = mix)
 */
export const fetchCandidates = (quantity, gender = 'mix') => dispatch => {
    dispatch(fetchCandidatesRequest(gender));
    mockAPICall(quantity, gender)
        .then(
            response => {
                dispatch(fetchCandidatesSuccess(response.mockData));
                dispatch(initVisibleUsers());
            },
            // todo: error handling
            error => {
                dispatch(fetchCandidatesFailure());
                dispatch(showInfoBar(error));
            }
        )
};

const fetchCandidatesRequest = gender => ({ type: ActionTypes.FETCH_CANDIDATES_REQUEST, gender });

const fetchCandidatesSuccess = (candidates) => ({ type: ActionTypes.FETCH_CANDIDATES_SUCCESS, candidates });

const fetchCandidatesFailure = () => ({ type: ActionTypes.FETCH_CANDIDATES_FAILURE});

/**
 * fetch one more user (Async Action)
 * @param quantity
 */
export const fetchMoreCandidate = (quantity) => dispatch => {
    mockAPICall(quantity)
        .then(
            response => dispatch(receiveMoreCandidates(response.mockData)),
            // todo: error handling
            error => {
                console.log(error);
            }
        )
};

const receiveMoreCandidates = candidates => ({ type: ActionTypes.RECEIVE_MORE_CANDIDATES, candidates });

/**
 * like candidate (Not action)
 * @param user
 */
export const likeCandidate = (user) => {
    mockPostAPI()
        .then(
            res => console.log(res),
            error => showInfoBar(error)
        )
};

/**
 * dislike candidate (Not action)
 * @param user
 */
export const dislikeCandidate = (user) => {
    mockPostAPI()
        .then(
            res => console.log("dis" + res),
            error => showInfoBar(error)
        )
};

/**
 * update visible users (Sync Action)
 * @param index
 */
export const updateVisibleUsersAndCandidates = (index) => ({ type: ActionTypes.UPDATE_USER_LISTS, index });

/**
 * initialize the three visible users (Sync Action)
 */
const initVisibleUsers = () => ({ type: ActionTypes.INITIALIZE_VISIBLE_USERS });
