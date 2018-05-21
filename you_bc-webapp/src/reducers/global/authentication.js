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
            return {...state, authStatusCode: action.statusCode, authMessage: action.message};
        default:
            return state;
    }
};

export default authentication;
