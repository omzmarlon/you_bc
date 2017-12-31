'use strict';

import * as ActionTypes from '../../actions/actionTypes';

const initialState = {
    visibleUsers: []
};

/**
 * Handle visible user list
 */
const mainListUI = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.UPDATE_VISIBLE_USERS:
            return {
                visibleUsers: [
                    ...state.visibleUsers.slice(0, action.index),
                    ...state.visibleUsers.slice(action.index+1, 3),
                    action.next
                ]
            };
        default:
            return state;
    }
};

export default mainListUI;