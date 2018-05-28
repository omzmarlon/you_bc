import { combineReducers } from 'redux';
import profile from './profile/profile';
import profileUI from './profile/profileUI';
import global from './global/global';
import verification from './global/verification';
import globalUI from './global/globalUI';
import mainList from "./mainList/mainList";
import authentication from "./global/authentication";
import * as ActionTypes from "../actions/actionTypes";

const appReducer = combineReducers({
    global,
    globalUI,
    mainList,
    profile,
    profileUI,
    verification,
    authentication
});

const rootReducer = (state, action) => {
    if (action.type === ActionTypes.SIGN_OUT) {
        state = undefined;
    }
    return appReducer(state, action);
};

export default rootReducer;