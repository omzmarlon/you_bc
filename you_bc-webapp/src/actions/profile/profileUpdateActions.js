import {
    UPDATE_AVATAR,
    UPDATE_CLASSMATES_VALUES, UPDATE_FRIENDS_VALUES, UPDATE_PERSONAL_VALUES,
    UPDATE_ROOMMATES_VALUES, UPDATE_WECHAT_ID
} from "../actionTypes";
import axios from 'axios';
import {
    authorizationHeader, authorizedConfig,
    AVATAR_API,
    CLASSMATES_PROFILE_API, FRIENDS_PROFILE_API, PERSONAL_PROFILE_API, requestUrl,
    ROOMMATES_PROFILE_API, WECHATID_API
} from "../../constants/api";
import {showInfoBar} from "../global/globalActions";

export const updateClassmatesValues = (classmatesValues) => ({type: UPDATE_CLASSMATES_VALUES, classmatesValues});
export const updateFriendsValues = (friendsValues) => ({type: UPDATE_FRIENDS_VALUES, friendsValues});
export const updateRoommatesValues = (roommatesValues) => ({type: UPDATE_ROOMMATES_VALUES, roommatesValues});
export const updatePersonalValues = (personalValues) => ({type: UPDATE_PERSONAL_VALUES, personalValues});
export const updateAvatar = (avatar) => ({type: UPDATE_AVATAR, avatar});
export const updateWeChatId = (weChatId) => ({type: UPDATE_WECHAT_ID, weChatId});

export const updateWeChatIdRequest = (weChatId) => dispatch => {
    axios.put(
        requestUrl(WECHATID_API),
        weChatId,
        {
            headers: {'Content-Type': 'text/plain', ...authorizationHeader()}
        }
    )
        .then(response => {
            dispatch(updateWeChatId(weChatId));
        }, err => {
            // TODO: centralize error handling
            dispatch(showInfoBar("更新微信号失败"));
            if (err.response.data.error) {
                console.log(err.response.data.error);
            }
        });
};

export const updateAvatarRequest = (avatarUrl) => dispatch => {
    axios.put(
        requestUrl(AVATAR_API),
        avatarUrl,
        {
            headers: {'Content-Type': 'text/plain', ...authorizationHeader()}
        }
    ).then(response => {
        dispatch(updateAvatar(avatarUrl));
    }, err => {
        // TODO: centralize error handling
        dispatch(showInfoBar("更新头像失败"));
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
    axios.put(requestUrl(PERSONAL_PROFILE_API), requestBody, authorizedConfig())
        .then(
            response => {
                dispatch(updatePersonalValues(personalValues));
                dispatch(showInfoBar("更新个人信息成功"));
            },
            err => {
                // TODO: centralize error handling
                dispatch(showInfoBar("更新个人信息失败"));
                if (err.response.data.error) {
                    console.log(err.response.data.error);
                }
            }
        );
};

export const updateClassmatesValuesRequest = (classmatesValues) => dispatch => {
    axios.put(requestUrl(CLASSMATES_PROFILE_API), classmatesValues, authorizedConfig())
        .then(response => {
            dispatch(updateClassmatesValues(classmatesValues));
            dispatch(showInfoBar("更新找课友信息成功"));
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
    axios.put(requestUrl(FRIENDS_PROFILE_API), friendsValues, authorizedConfig())
        .then(response => {
            dispatch(updateFriendsValues(friendsValues));
            dispatch(showInfoBar("更新找朋友信息成功"));
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
    axios.put(requestUrl(ROOMMATES_PROFILE_API), roommatesValues, authorizedConfig())
        .then(response => {
            dispatch(updateRoommatesValues(roommatesValues));
            dispatch(showInfoBar("更新找室友信息成功"));
        })
        .catch(err => {
            // TODO: centralize error handling
            dispatch(showInfoBar("更新找室友信息失败"));
            if (err.response.data.error) {
                console.log(err.response.data.error);
            }
        });
};