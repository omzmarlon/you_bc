import {
    HIDE_AVATAR_FORMS,
    HIDE_CLASSMATES_FORMS, HIDE_FRIENDS_FORMS, HIDE_PERSONAL_FORMS,
    HIDE_ROOMMATES_FORMS, SHOW_AVATAR_FORMS,
    SHOW_CLASSMATES_FORMS, SHOW_FRIENDS_FORMS, SHOW_MATCHING_LIST, SHOW_PERSONAL_FORMS, SHOW_PROFILE_MAIN,
    SHOW_ROOMMATES_FORMS
} from "../actionTypes";

export const showProfileMain = () => ({type: SHOW_PROFILE_MAIN});
export const showMatchingList = () => ({type: SHOW_MATCHING_LIST});

export const showRoommatesForm = () => ({type: SHOW_ROOMMATES_FORMS});
export const showClassMatesForm = () => ({type: SHOW_CLASSMATES_FORMS});
export const showFriendsForm = () => ({type: SHOW_FRIENDS_FORMS});
export const hideRoommatesForm = () => ({type: HIDE_ROOMMATES_FORMS});
export const hideClassmatesForm = () => ({type: HIDE_CLASSMATES_FORMS});
export const hideFriendsForm = () => ({type: HIDE_FRIENDS_FORMS});
export const showPersonalForm = () => ({type: SHOW_PERSONAL_FORMS});
export const hidePersonalForm = () => ({type: HIDE_PERSONAL_FORMS});
export const showAvatarForm = () => ({type: SHOW_AVATAR_FORMS});
export const hideAvatarForm = () => ({type: HIDE_AVATAR_FORMS});