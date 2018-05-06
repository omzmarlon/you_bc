import * as ActionTypes from "../../actions/actionTypes";

const initial = {
    showInfoBar: false,
    infoBarMessage: '',
    isLoading: false
};

const global = (state = initial, action) => {
    switch (action.type) {
        case ActionTypes.SHOW_INFO_BAR:
            return {...state, showInfoBar: true, infoBarMessage: action.infoBarMessage};
        case ActionTypes.HIDE_INFO_BAR:
            return {...state, showInfoBar: false, infoBarMessage: ''};
        default:
            return state;
    }
};

export default global;
