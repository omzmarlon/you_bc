import { combineReducers } from 'redux';
import example from './example';
import profile from './profile/profile';
import profileUI from './profile/profileUI';
import global from './global/global';
import globalUI from './global/globalUI';

const rootReducer = combineReducers({
    example,
    profile,
    profileUI,
    global,
    globalUI
});

export default rootReducer;