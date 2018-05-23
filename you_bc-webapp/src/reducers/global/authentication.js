import * as ActionTypes from "../../actions/actionTypes";
import AuthStatus from "../../utils/AuthStatus";

const initial = {
    authStatusCode: AuthStatus.UNKNOWN,
    authMessage: '',
    authDetail: {
        username: ''
    },
};

const authentication = (state = initial, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN_REQUEST:
            // TODO Do we need this?
            return state;
        case ActionTypes.REGISTER_REQUEST:
            return state;
        case ActionTypes.LOGIN_COMPLETE: // todo: do we still need this given updateAuthStatusCode?
            return {...state, authStatusCode: action.statusCode, authMessage: action.message};
        case ActionTypes.UPDATE_AUTH_STATUS_CODE:
            return {
                ...state,
                authStatusCode: action.authStatusCode
            };
        case ActionTypes.UPDATE_AUTH_DETAIL:
            return {
                ...state,
                authDetail: {
                    username: action.authDetail.username
                }
            };
        default:
            return state;
    }
};

export default authentication;
