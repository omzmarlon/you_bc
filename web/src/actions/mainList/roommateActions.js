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
                        //     address: 'Vancouver',
                        //     country: '中国',
                        //     city: '重庆',
                        //     motto: '人生就是不停的吃吃喝喝',
                        //     hobbies: ['跑步', '音乐', '登山']
                        // }
                    ]
                });
            } else {
                fulfill({
                    mockData: [
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
 */
export const fetchCandidates = (quantity) => dispatch => {
    dispatch(fetchCandidatesRequest());
    mockAPICall(quantity)
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

const fetchCandidatesRequest = () => ({ type: ActionTypes.FETCH_CANDIDATES_REQUEST });

const fetchCandidatesSuccess = (candidates) => ({ type: ActionTypes.FETCH_CANDIDATES_SUCCESS, candidates });

const fetchCandidatesFailure = () => ({ type: ActionTypes.FETCH_CANDIDATES_FAILURE});

/**
 * fetch one more user (Async Action)
 * @param quantity
 */
export const fetchMoreCandidate = (quantity) => dispatch => {
    mockAPICall(quantity)
        .then(
            response => dispatch(fetchCandidatesSuccess(response.mockData)),
            // todo: error handling
            error => {
                dispatch(fetchCandidatesFailure());
            }
        )
};

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