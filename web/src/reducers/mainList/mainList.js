'use strict';

import * as ActionTypes from '../../actions/actionTypes';

const initialState = {
    isFetching: false,
    candidates: []
};

/**
 * Fetch data and like/dislike user
 */
const mainList = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_CANDIDATES_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case ActionTypes.FETCH_CANDIDATES_SUCCESS:
            return {
                ...state,
                isFetching: false,
                candidates: action.candidates
            };
        case ActionTypes.FETCH_CANDIDATES_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.error
            };
        case ActionTypes.LIKE_CANDIDATE_ERROR:
        case ActionTypes.DISLIKE_CANDIDATE_ERROR:
            return {
                ...state,
                error: action.error
            };
        case ActionTypes.LIKE_CANDIDATE:
        case ActionTypes.DISLIKE_CANDIDATE:
        default:
            return state;
    }
};

export default mainList;