import {HIDE_INFO_BAR, SHOW_INFO_BAR, UPDATE_USERNAME, UPDATE_WECHAT_ID} from "../../actions/actionTypes";

const initial = {
    username: '沐凡成甫',
    weChatId: '',
    showInfoBar: false,
    infoBarMessage: ''
};

const global = (state = initial, action) => {
    switch (action.type) {
        case UPDATE_WECHAT_ID:
            return Object.assign({}, state, {weChatId: action.weChatId});
        case UPDATE_USERNAME:
            return Object.assign({}, state, {username: action.username});
        case SHOW_INFO_BAR:
            return {...state, showInfoBar: true, infoBarMessage: action.infoBarMessage};
        case HIDE_INFO_BAR:
            return {...state, showInfoBar: false, infoBarMessage: ''};
        default:
            return state;
    }
};

export default global;
