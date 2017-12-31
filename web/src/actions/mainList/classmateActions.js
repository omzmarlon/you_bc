'use strict';

import * as ActionTypes from '../actionTypes';

const mockAPICall = () => {
    return new Promise((fulfill, reject) => {
        setTimeout(() => {
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
        }, 500);
    });
};

const mockPostAPI = () => {
    return new Promise((fulfill, reject) => {
        setTimeout(() => fulfill("liked!"), 500);
    });
};

/**
 * fetch data
 */
export const fetchCandidates = (quantity) => dispatch => {
    dispatch(fetchCandidatesRequest());
    mockAPICall()
        .then(res => {
            dispatch(fetchCandidatesSuccess(res.mockData));
        })
        .catch(error => {
            dispatch(fetchCandidatesFailure(error));
        })
};

const fetchCandidatesRequest = () => ({ type: ActionTypes.FETCH_CANDIDATES_REQUEST });

const fetchCandidatesSuccess = (candidates) => ({ type: ActionTypes.FETCH_CANDIDATES_SUCCESS, candidates });

const fetchCandidatesFailure = (error) => ({ type: ActionTypes.FETCH_CANDIDATES_FAILURE, error });

/**
 * like candidate
 */
export const likeCandidate = (userId) => dispatch => {
    mockPostAPI()
        .then(res => console.log(res))
        .catch(error => {
            dispatch(likeCandidateError(error));
        })
};

const likeCandidateError = (error) => ({ type: ActionTypes.LIKE_CANDIDATE_ERROR, error });

/**
 * dislike candidate
 */
export const dislikeCandidate = (userId) => dispatch => {
    mockPostAPI(userId)
        .then(res => console.log("dis" + res))
        .catch(error => {
            dispatch(dislikeCandidateError(error));
        })
};

const dislikeCandidateError = (error) => ({ type: ActionTypes.DISLIKE_CANDIDATE_ERROR, error });

/**
 * UI: visible users
 */
export const updateVisibleUsers = (candidateIndex, nextCandidate) => dispatch => {
    dispatch({
        type: ActionTypes.UPDATE_VISIBLE_USERS,
        index: candidateIndex,
        next: nextCandidate
    });
};

