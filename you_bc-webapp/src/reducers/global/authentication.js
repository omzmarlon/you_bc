import * as ActionTypes from "../../actions/actionTypes";
import AuthStatus from "../../utils/AuthStatus";
import {FETCHING_AUTH_STATUS} from "../../actions/actionTypes";

const initial = {
    authStatusCode: AuthStatus.UNKNOWN, // todo make a enum of status codes
    authMessage: '',
    username: '',
    isFetchingAuthStatus: true
};

const authentication = (state = initial, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN_REQUEST:
            // TODO Do we need this?
            return state;
        case ActionTypes.REGISTER_REQUEST:
            return state;
        case ActionTypes.LOGIN_COMPLETE:
            return {...state, authStatusCode: action.statusCode, authMessage: action.message};
        case ActionTypes.UPDATE_AUTH_STATUS:
            return {
                ...state,
                username: action.username,
                authStatusCode: action.authStatusCode
            };
        case FETCHING_AUTH_STATUS:
            return {
                ...state,
                authStatusCode: AuthStatus.FETCHING
            };
        default:
            return state;
    }
};

export default authentication;
