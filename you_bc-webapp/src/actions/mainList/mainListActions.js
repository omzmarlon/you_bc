'use strict';

import * as ActionTypes from '../actionTypes';
import {showInfoBar} from "../global/globalActions";
import axios from 'axios';
import {
    authorizedConfig,
    FETCH_CLASSMATES_API,
    FETCH_FRIENDS_API,
    FETCH_ROOMMATES_API,
    requestUrl
} from "../../constants/api";

/**
 * fetch data (Async Action)
 * @param api
 * @param quantity
 * @param gender (default = mix)
 */
export const fetchCandidates = (api, quantity, gender = 'mix') => dispatch => {
    dispatch(fetchCandidatesRequest(gender));
    let url = requestUrl(api) + `?amount=${quantity}&gender=${gender}`;
    axios.get(url, authorizedConfig())
        .then(
            response => {
                let candidates = response.data.map(json => populateData(json, api));
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
 * @param api
 * @param quantity
 * @param gender
 */
export const fetchMoreCandidate = (api, quantity, gender) => dispatch => {
    let url = requestUrl(api) + `?amount=${quantity}&gender=${gender}`;
    axios.get(url, authorizedConfig())
        .then(
            response => {
                let candidates = response.data.map(json => populateData(json, api));
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
 * @param likeAPI
 */
export const likeCandidate = (likeAPI) => {
    let url = requestUrl(likeAPI);
    axios.post(url, {}, authorizedConfig())
        .then(
            response => {},
            error => showInfoBar(error.message)
        )
};

/**
 * dislike candidate (Not action)
 * @param dislikeAPI
 */
export const dislikeCandidate = (dislikeAPI) => {
    let url = requestUrl(dislikeAPI);
    axios.post(url, {}, authorizedConfig())
        .then(
            response => {},
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
 * @param api
 * @returns {*}
 */
const populateData = (responseJson, api) => {
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

    switch (api) {
        case FETCH_CLASSMATES_API:
            return {
                userId: responseJson.userId,
                avatar: responseJson.avatarUrl,
                name: responseJson.name,
                gender: gender,
                age: responseJson.age,
                constellation: responseJson.constellation,
                matchRate: responseJson.matchRate,
                major: responseJson.major,
                year: responseJson.year,
                courses: responseJson.courses,
                studyAbility: responseJson.studyAbility,
                requirements: responseJson.tags
            };
        case FETCH_FRIENDS_API:
            return {
                userId: responseJson.userId,
                avatar: responseJson.avatarUrl,
                name: responseJson.name,
                gender: gender,
                age: responseJson.age,
                constellation: responseJson.constellation,
                matchRate: responseJson.matchRate,
                faculty: responseJson.faculty,
                relationship: responseJson.relationship,
                motto: responseJson.motto,
                hobbies: responseJson.tags
            };
        case FETCH_ROOMMATES_API:
            return {
                userId: responseJson.userId,
                avatar: responseJson.avatarUrl,
                name: responseJson.name,
                gender: gender,
                age: responseJson.age,
                constellation: responseJson.constellation,
                matchRate: responseJson.matchRate,
                address: responseJson.location,
                country: responseJson.hometown,
                city: responseJson.hometown,
                selfDescription: responseJson.motto,
                lifeHabits: responseJson.tags
            };
    }
};
