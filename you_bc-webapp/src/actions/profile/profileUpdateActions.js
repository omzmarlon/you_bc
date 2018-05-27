import {
    UPDATE_AVATAR,
    UPDATE_CLASSMATES_VALUES, UPDATE_FRIENDS_VALUES, UPDATE_PERSONAL_VALUES,
    UPDATE_ROOMMATES_VALUES, UPDATE_WECHAT_ID
} from "../actionTypes";
import {showInfoBar} from "../global/globalActions";
import {
    putAvatarRequest,
    putClassmatesProfileRequest, putFriendsProfileRequest,
    putPersonalProfileRequest, putRoommatesProfileRequest,
    putWeChadIDRequest
} from "../../requests/profileUpdateRequests";

export const updateClassmatesValues = (classmatesValues) => ({type: UPDATE_CLASSMATES_VALUES, classmatesValues});
export const updateFriendsValues = (friendsValues) => ({type: UPDATE_FRIENDS_VALUES, friendsValues});
export const updateRoommatesValues = (roommatesValues) => ({type: UPDATE_ROOMMATES_VALUES, roommatesValues});
export const updatePersonalValues = (personalValues) => ({type: UPDATE_PERSONAL_VALUES, personalValues});
export const updateAvatar = (avatar) => ({type: UPDATE_AVATAR, avatar});
export const updateWeChatId = (weChatId) => ({type: UPDATE_WECHAT_ID, weChatId});

export const updateWeChatIdRequest = (weChatId) => dispatch => {
    putWeChadIDRequest(weChatId)
        .then(response => {
            dispatch(updateWeChatId(weChatId));
        }, err => {
            // TODO: centralize error handling
            dispatch(showInfoBar("Failed to update WeChat ID"));
            if (err.response.data.error) {
                console.log(err.response.data.error);
            }
        });
};

export const updateAvatarRequest = (avatarUrl) => dispatch => {
    putAvatarRequest(avatarUrl)
        .then(
            response => {
                dispatch(updateAvatar(avatarUrl));
             },
            err => {
                // TODO: centralize error handling
                dispatch(showInfoBar("Failed to Update Profile Image"));
                if (err.response.data.error) {
                    console.log(err.response.data.error);
                }
            });
};

export const updatePersonalValuesRequest = (personalValues) => dispatch => {
    const requestBody = {
        username: personalValues.username,
        age: personalValues.age,
        sex: personalValues.sex === 'Male'?1:2,
        horoscope: personalValues.constellation
    };
    putPersonalProfileRequest(requestBody)
        .then(
            response => {
                dispatch(updatePersonalValues(personalValues));
                dispatch(showInfoBar("Update Basic Info Success"));
            },
            err => {
                // TODO: centralize error handling
                dispatch(showInfoBar("Failed to update Basic Info"));
                if (err.response.data.error) {
                    console.log(err.response.data.error);
                }
            }
        );
};

export const updateClassmatesValuesRequest = (classmatesValues) => dispatch => {
    putClassmatesProfileRequest(classmatesValues)
        .then(response => {
            dispatch(updateClassmatesValues(classmatesValues));
            dispatch(showInfoBar("Update Classmates Info Success"));
        })
        .catch(err => {
            // TODO: centralize error handling
            dispatch(showInfoBar("Failed to update Classmates Info"));
            if (err.response.data.error) {
                console.log(err.response.data.error);
            }
        });
};
export const updateFriendsValuesRequest = (friendsValues) => dispatch => {
    putFriendsProfileRequest(friendsValues)
        .then(response => {
            dispatch(updateFriendsValues(friendsValues));
            dispatch(showInfoBar("Update Friends Info Success"));
        })
        .catch(err => {
            // TODO: centralize error handling
            dispatch(showInfoBar("Failed to update Friends Info"));
            if (err.response.data.error) {
                console.log(err.response.data.error);
            }
        });
};
export const updateRoommatesValuesRequest = (roommatesValues) => dispatch => {
    putRoommatesProfileRequest(roommatesValues)
        .then(response => {
            dispatch(updateRoommatesValues(roommatesValues));
            dispatch(showInfoBar("Update Roommates Info Success"));
        })
        .catch(err => {
            // TODO: centralize error handling
            dispatch(showInfoBar("Failed to update Roommate Info"));
            if (err.response.data.error) {
                console.log(err.response.data.error);
            }
        });
};