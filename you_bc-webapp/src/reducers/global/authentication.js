import * as ActionTypes from "../../actions/actionTypes";
import AuthStatus from "../../utils/AuthStatus";

const initial = {
    authStatusCode: AuthStatus.UNKNOWN, // todo make a enum of status codes
    authMessage: '',
    username: '',
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
        default:
            return state;
    }
};

export default authentication;
