import {
    UPDATE_AVATAR,
    UPDATE_CLASSMATES_VALUES, UPDATE_FRIENDS_VALUES, UPDATE_PERSONAL_VALUES,
    UPDATE_ROOMMATES_VALUES
} from "../actionTypes";
import axios from 'axios';
import {CLASSMATES_PROFILE_API, FRIENDS_PROFILE_API, requestUrl, ROOMMATES_PROFILE_API} from "../../constants/api";
import {showInfoBar} from "../global/globalActions";

export const updateClassmatesValues = (classmatesValues) => ({type: UPDATE_CLASSMATES_VALUES, classmatesValues});
export const updateFriendsValues = (friendsValues) => ({type: UPDATE_FRIENDS_VALUES, friendsValues});
export const updateRoommatesValues = (roommatesValues) => ({type: UPDATE_ROOMMATES_VALUES, roommatesValues});
export const updatePersonalValues = (personalValues) => ({type: UPDATE_PERSONAL_VALUES, personalValues});
export const updateAvatar = (avatar) => ({type: UPDATE_AVATAR, avatar});

export const updateClassmatesValuesRequest = (classmatesValues) => dispatch => {
    axios.put(requestUrl(CLASSMATES_PROFILE_API), classmatesValues, {withCredentials: true})
        .then(response => {
            dispatch(updateClassmatesValues(classmatesValues));
        })
        .catch(err => {
            // TODO: centralize error handling
            dispatch(showInfoBar("更新找课友信息失败"));
            if (err.response.data.error) {
                console.log(err.response.data.error);
            }
        });
};
export const updateFriendsValuesRequest = (friendsValues) => dispatch => {
    axios.put(requestUrl(FRIENDS_PROFILE_API), friendsValues, {withCredentials: true})
        .then(response => {
            dispatch(updateFriendsValues(friendsValues));
        })
        .catch(err => {
            // TODO: centralize error handling
            dispatch(showInfoBar("更新找X友信息失败"));
            if (err.response.data.error) {
                console.log(err.response.data.error);
            }
        });
};
export const updateRoommatesValuesRequest = (roommatesValues) => dispatch => {
    axios.put(requestUrl(ROOMMATES_PROFILE_API), roommatesValues, {withCredentials: true})
        .then(response => {
            dispatch(updateRoommatesValues(roommatesValues));
        })
        .catch(err => {
            // TODO: centralize error handling
            dispatch(showInfoBar("更新找室友信息失败"));
            if (err.response.data.error) {
                console.log(err.response.data.error);
            }
        });
};