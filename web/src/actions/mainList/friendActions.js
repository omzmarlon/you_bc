'use strict';

import * as ActionTypes from '../actionTypes';

const mockAPICall = () => {
    return new Promise((fulfill, reject) => {
        setTimeout(() => {
            fulfill({
                mockData: [
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
// 
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

export const likeCandidate = (userId) => dispatch => {
    mockPostAPI()
        .then(res => console.log(res))
        .catch(error => {
            dispatch(likeCandidateError(error));
        })
};

const likeCandidateError = (error) => ({ type: ActionTypes.LIKE_CANDIDATE_ERROR, error });

export const dislikeCandidate = (userId) => dispatch => {
    mockPostAPI()
        .then(res => console.log("dis" + res))
        .catch(error => {
            dispatch(dislikeCandidateError(error));
        })
};

const dislikeCandidateError = (error) => ({ type: ActionTypes.DISLIKE_CANDIDATE_ERROR, error });