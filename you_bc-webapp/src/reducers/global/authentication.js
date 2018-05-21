import * as ActionTypes from "../../actions/actionTypes";

const initial = {
    authStatusCode: -1, // todo make a enum of status codes
    authMessage: ''
};

const authentication = (state = initial, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN_REQUEST:
            // TODO Do we need this?
            return state;
        case ActionTypes.REGISTER_REQUEST:
            return state;
        case ActionTypes.LOGIN_COMPLETE:
            return {...state, authStatusCode: 200};
        case ActionTypes.REGISTER_COMPLETE:
            // todo register complete is not the same as login complete
            return {...state, authStatusCode: action.statusCode, authMessage: action.message};
        // todo: old, clean up
        case ActionTypes.FETCH_AUTH_TOKEN_REQUEST:
            return state;
        case ActionTypes.FETCH_AUTH_TOKEN_COMPLETE:
            return {...state, authStatusCode: action.statusCode, authMessage: action.message};
        default:
            return state;
    }
};

export default authentication;
