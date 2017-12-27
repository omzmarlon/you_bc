import {
    UPDATE_CLASSMATES_VALUES, UPDATE_FRIENDS_VALUES, UPDATE_PERSONAL_VALUES,
    UPDATE_ROOMMATES_VALUES
} from "../actionTypes";

export const updateClassmatesValues = (classmatesValues) => ({type: UPDATE_CLASSMATES_VALUES, classmatesValues});
export const updateFriendsValues = (friendsValues) => ({type: UPDATE_FRIENDS_VALUES, friendsValues});
export const updateRoommatesValues = (roommatesValues) => ({type: UPDATE_ROOMMATES_VALUES, roommatesValues});
export const updatePersonalValues = (personalValues) => ({type: UPDATE_PERSONAL_VALUES, personalValues});