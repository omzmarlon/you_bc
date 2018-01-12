import * as ActionTypes from "../../actions/actionTypes";

const initial = {
    isAuthenticating: true,
    authStatusCode: -1,
    authMessage: ''
};

const authentication = (state = initial, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_AUTH_TOKEN_REQUEST:
            return {...state, isAuthenticating: true};
        case ActionTypes.FETCH_AUTH_TOKEN_COMPLETE:
            return {...state, isAuthenticating: false, authStatusCode: action.statusCode, authMessage: action.message};
        default:
            return state;
    }
};

export default authentication;
