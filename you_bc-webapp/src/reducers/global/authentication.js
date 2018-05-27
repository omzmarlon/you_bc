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
        case ActionTypes.REGISTER_REQUEST:
            return state;
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
        case ActionTypes.SIGN_OUT:
            return {
                ...state,
                authStatusCode: AuthStatus.UNKNOWN
            };
        default:
            return state;
    }
};

export default authentication;
