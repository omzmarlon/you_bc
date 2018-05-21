import * as ActionTypes from "../../actions/actionTypes";

const initial = {
    showInfoBar: false,
    infoBarMessage: '',
    globalLoading: false
};

const global = (state = initial, action) => {
    switch (action.type) {
        case ActionTypes.SHOW_INFO_BAR:
            return {...state, showInfoBar: true, infoBarMessage: action.infoBarMessage};
        case ActionTypes.HIDE_INFO_BAR:
            return {...state, showInfoBar: false, infoBarMessage: ''};
        case ActionTypes.SHOW_GLOBAL_SPINNER:
            return {...state, globalLoading: true};
        case ActionTypes.HIDE_GLOBAL_SPINNER:
            return {...state, globalLoading: false};
        default:
            return state;
    }
};

export default global;
