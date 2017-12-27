import {UPDATE_USERNAME, UPDATE_WECHAT_ID} from "../../actions/actionTypes";

const initial = {
    username: '',
    weChatId: '',
};

const global = (state = initial, action) => {
    switch (action.type) {
        case UPDATE_WECHAT_ID:
            return Object.assign({}, state, {weChatId: action.weChatId});
        case UPDATE_USERNAME:
            return Object.assign({}, state, {username: action.username});
        default:
            return state;
    }
};

export default global;
