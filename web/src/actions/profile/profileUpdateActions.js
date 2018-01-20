import {
    UPDATE_AVATAR,
    UPDATE_CLASSMATES_VALUES, UPDATE_FRIENDS_VALUES, UPDATE_PERSONAL_VALUES,
    UPDATE_ROOMMATES_VALUES, UPDATE_WECHAT_ID
} from "../actionTypes";
import axios from 'axios';
import {
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
            withCredentials: true,
            headers: {'Content-Type': 'text/plain'}
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
            withCredentials: true,
            headers: {'Content-Type': 'text/plain'}
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
        sex: personalValues.sex === '男'?1:2,
        horoscope: personalValues.constellation
    };
    axios.put(requestUrl(PERSONAL_PROFILE_API), requestBody, {withCredentials: true})
        .then(
            response => dispatch(updatePersonalValues(personalValues)),
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