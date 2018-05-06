'use strict';

import * as ActionTypes from '../../actions/actionTypes';

const initialState = {
    isFetching: false,
    candidates: [],
    visibleUsers: [],
    genderFilter: 'mix'
};

/**
 * Fetch data and like/dislike user
 */
const mainList = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_CANDIDATES_REQUEST:
            return {
                ...state,
                isFetching: true,
                genderFilter: action.gender
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
            };
        case ActionTypes.INITIALIZE_VISIBLE_USERS:
            let visible = (state.candidates.length <= 3) ?
                state.candidates : state.candidates.slice(0, 3);
            return {
                ...state,
                candidates: state.candidates.slice(3, state.candidates.length), // slice is robust
                visibleUsers: visible
            };
        case ActionTypes.RECEIVE_MORE_CANDIDATES:
            return {
                ...state,
                candidates: [...state.candidates, ...action.candidates]
            };
        case ActionTypes.UPDATE_USER_LISTS:
            let visibles = state.visibleUsers;
            let candidates = state.candidates;
            if (candidates.length > 0) {
                return {
                    ...state,
                    candidates: candidates.slice(1, candidates.length),
                    visibleUsers: [
                        ...visibles.slice(0, action.index),
                        ...visibles.slice(action.index+1, visibles.length),
                        candidates[0]
                    ]
                };
            } else {
                return {
                    ...state,
                    visibleUsers: [
                        ...visibles.slice(0, action.index),
                        ...visibles.slice(action.index+1, visibles.length)
                    ]
                };
            }
        case ActionTypes.LIKE_CANDIDATE:
        case ActionTypes.DISLIKE_CANDIDATE:
        default:
            return state;
    }
};

export default mainList;