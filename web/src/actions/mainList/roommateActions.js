/**
 * fetch data (Async Action)
 * @param quantity
 * @param gender (default = mix)
 */
'use strict';

import * as ActionTypes from '../actionTypes';
import {showInfoBar} from "../global/globalActions";
import axios from 'axios';
import {DISLIKE_ROOMMATES_API, FETCH_ROOMMATES_API, LIKE_ROOMMATES_API, requestUrl} from "../../constants/api";

const mockPostAPI = () => {
    return new Promise((fulfill, reject) => {
        setTimeout(() => fulfill("liked!"), 500);
    });
};

export const fetchCandidates = (quantity, gender = 'mix') => dispatch => {
    dispatch(fetchCandidatesRequest(gender));
    let url = requestUrl(FETCH_ROOMMATES_API) + `?amount=${quantity}&gender=${gender}`;
    axios.get(url, {withCredentials: true})
        .then(
            response => {
                let candidates = response.data.map(populateRoommateData);
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
    let url = requestUrl(FETCH_ROOMMATES_API) + `?amount=${quantity}&gender=${gender}`;
    axios.get(url, {withCredentials: true})
        .then(
            response => {
                let candidates = response.data.map(populateRoommateData);
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
    let url = requestUrl(LIKE_ROOMMATES_API(userId));
    axios.post(url, {}, {withCredentials: true})
        .then(
            response => console.log("Liked!"),
            error => showInfoBar(error.message)
        )
};

/**
 * dislike candidate (Not action)
 * @param userId
 */
export const dislikeCandidate = (userId) => {
    let url = requestUrl(DISLIKE_ROOMMATES_API(userId));
    axios.post(url, {}, {withCredentials: true})
        .then(
            response => console.log("disliked!"),
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
 * @returns {{avatar: *, name, gender: string, age: (number|*), constellation: (string|string|*|string), matchRate: *, address, country: (string|*), city: (string|*), motto, hobbies}}
 */
const populateRoommateData = (responseJson) => {
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
        address: responseJson.location,
        country: responseJson.hometown,
        city: responseJson.hometown,
        motto: responseJson.motto,
        hobbies: responseJson.tags
    }
};