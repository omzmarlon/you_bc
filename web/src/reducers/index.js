import { combineReducers } from 'redux';
import example from './example';
import profile from './profile/profile';
import profileUI from './profile/profileUI';
import global from './global/global';
import globalUI from './global/globalUI';
import mainList from "./mainList/mainList";
import mainListUI from "./mainList/mainListUI";

const rootReducer = combineReducers({
    example,
    global,
    globalUI,
    mainList,
    mainListUI,
    profile,
    profileUI
});

export default rootReducer;