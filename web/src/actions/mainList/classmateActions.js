/**
 * fetch data
 */
'use strict';

import * as ActionTypes from '../actionTypes';
import {showInfoBar} from "../global/globalActions";
import axios from 'axios';
import {DISLIKE_CLASSMATES_API, FETCH_CLASSMATES_API, LIKE_CLASSMATES_API, requestUrl} from "../../constants/api";

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
    let url = requestUrl(FETCH_CLASSMATES_API) + `?amount=${quantity}&gender=${gender}`;
    axios.get(url, {withCredentials: true})
        .then(
            response => {
                let candidates = response.data.map(populateClassmateData);
                dispatch(fetchCandidatesSuccess(candidates));
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
export const fetchMoreCandidate = (quantity, gender) => dispatch => {
    let url = requestUrl(FETCH_CLASSMATES_API) + `?amount=${quantity}&gender=${gender}`;
    axios.get(url, {withCredentials: true})
        .then(
            response => {
                let candidates = response.data.map(populateClassmateData);
                dispatch(receiveMoreCandidates(candidates))
            },
            // todo: error handling
            error => {
                dispatch(fetchCandidatesFailure());
            }
        )
};

const receiveMoreCandidates = candidates => ({ type: ActionTypes.RECEIVE_MORE_CANDIDATES, candidates });

/**
 * like candidate (Not action)
 * @param userId
 */
export const likeCandidate = (userId) => {
    let url = requestUrl(LIKE_CLASSMATES_API(userId));
    axios.post(url, {}, {withCredentials: true})
        .then(
            response => console.log("liked!"),
            error => showInfoBar(error.message)
        )
};

/**
 * dislike candidate (Not action)
 * @param userId
 */
export const dislikeCandidate = (userId) => {
    let url = requestUrl(DISLIKE_CLASSMATES_API(userId));
    axios.post(url, {}, {withCredentials: true})
        .then(
            response => console.log("dislike!"),
            error => showInfoBar(error.message)
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

/**
 * helper function (populate data to fit in front end data structure)
 * @param responseJson
 * @returns {{avatar: *, name, gender: string, age, constellation, matchRate: (number|*), major: (string|*|string|string), year, courses: (Array|*), studyAbility: (string|*), requirements: (*|Array)}}
 */
const populateClassmateData = (responseJson) => {
    let gender = '';
    switch (responseJson.sex) {
        case 1:
            gender = 'male';
            break;
        case 2:
            gender = 'female';
            break;
        default:
            gender = null;
    }
    return {
        userId: responseJson.userId,
        avatar: responseJson.avatarUrl,
        name: responseJson.name,
        gender: gender,
        age: responseJson.age,
        constellation: responseJson.constellation,
        matchRate: responseJson.matchRate + 0.01, // todo: UI doesn't work with 0
        major: responseJson.major,
        year: responseJson.year,
        courses: responseJson.courses,
        studyAbility: responseJson.studyAbility,
        requirements: responseJson.tags
    }
};
