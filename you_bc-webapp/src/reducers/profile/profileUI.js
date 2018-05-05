import {
    HIDE_AVATAR_FORMS,
    HIDE_CLASSMATES_FORMS,
    HIDE_FRIENDS_FORMS, HIDE_PERSONAL_FORMS,
    HIDE_ROOMMATES_FORMS, SHOW_AVATAR_FORMS, SHOW_CLASSMATES_FORMS, SHOW_FRIENDS_FORMS, SHOW_MATCHING_LIST,
    SHOW_PERSONAL_FORMS,
    SHOW_PROFILE_MAIN,
    SHOW_ROOMMATES_FORMS
} from "../../actions/actionTypes";

const initialState = {
    panelIndex: 0, // 0 for main panel, 1 for Matching list
    showRoommatesForm: false,
    showFriendsForm: false,
    showClassmatesForm: false,
    showPersonalForm: false,
    showAvatarForm: false
};

const profileUI = (state = initialState, action) => {
    switch (action.type) {
        // switching panels
        case SHOW_PROFILE_MAIN:
            return Object.assign({}, state, {panelIndex: 0});
        case SHOW_MATCHING_LIST:
            return Object.assign({}, state, {panelIndex: 1});
        // show/hide forms
        case SHOW_ROOMMATES_FORMS:
            return Object.assign({}, state, {showRoommatesForm: true});
        case HIDE_ROOMMATES_FORMS:
            return Object.assign({}, state, {showRoommatesForm: false});
        case SHOW_FRIENDS_FORMS:
            return Object.assign({}, state, {showFriendsForm: true});
        case HIDE_FRIENDS_FORMS:
            return Object.assign({}, state, {showFriendsForm: false});
        case SHOW_CLASSMATES_FORMS:
            return Object.assign({}, state, {showClassmatesForm: true});
        case HIDE_CLASSMATES_FORMS:
            return Object.assign({}, state, {showClassmatesForm: false});
        case SHOW_PERSONAL_FORMS:
            return Object.assign({}, state, {showPersonalForm: true});
        case HIDE_PERSONAL_FORMS:
            return Object.assign({}, state, {showPersonalForm: false});
        case SHOW_AVATAR_FORMS:
            return {...state, showAvatarForm: true};
        case HIDE_AVATAR_FORMS:
            return {...state, showAvatarForm: false};
        default:
            return state;
    }
};

export default profileUI;
