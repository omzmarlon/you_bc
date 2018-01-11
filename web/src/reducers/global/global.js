import * as ActionTypes from "../../actions/actionTypes";

const initial = {
    username: '沐凡成甫',
    weChatId: '',
    showInfoBar: false,
    infoBarMessage: '',
    isLoading: false,
    isAuthenticating: true,
    authStatusCode: -1,
    authMessage: ''
};

const global = (state = initial, action) => {
    switch (action.type) {
        case ActionTypes.UPDATE_WECHAT_ID:
            return {...state, weChatId: action.weChatId};
        case ActionTypes.UPDATE_USERNAME:
            return {...state, username: action.username};
        case ActionTypes.SHOW_INFO_BAR:
            return {...state, showInfoBar: true, infoBarMessage: action.infoBarMessage};
        case ActionTypes.HIDE_INFO_BAR:
            return {...state, showInfoBar: false, infoBarMessage: ''};
        case ActionTypes.FETCH_AUTH_TOKEN_REQUEST:
            return {...state, isAuthenticating: true};
        case ActionTypes.FETCH_AUTH_TOKEN_COMPLETE:
            return {...state, isAuthenticating: false, authStatusCode: action.statusCode, authMessage: action.message};
        default:
            return state;
    }
};

export default global;
