import axios from 'axios';
import {
    authorizationHeader,
    authorizedConfig,
    AVATAR_API, CLASSMATES_PROFILE_API, FRIENDS_PROFILE_API,
    PERSONAL_PROFILE_API,
    requestUrl, ROOMMATES_PROFILE_API,
    WECHATID_API
} from "../constants/api";

export const putWeChadIDRequest = (weChatId) => (
    axios.put(
        requestUrl(WECHATID_API),
        weChatId,
        {headers: {'Content-Type': 'text/plain', ...authorizationHeader()}}
    )
);

export const putAvatarRequest = (avatarUrl) => (
    axios.put(
        requestUrl(AVATAR_API),
        avatarUrl,
        {headers: {'Content-Type': 'text/plain', ...authorizationHeader()}}
    )
);

export const putPersonalProfileRequest = (requestBody) => (
    axios.put(requestUrl(PERSONAL_PROFILE_API), requestBody, authorizedConfig())
);

export const putClassmatesProfileRequest = (requestBody) => (
    axios.put(requestUrl(CLASSMATES_PROFILE_API), requestBody, authorizedConfig())
);

export const putFriendsProfileRequest = (requestBody) => (
    axios.put(requestUrl(FRIENDS_PROFILE_API), requestBody, authorizedConfig())
);

export const putRoommatesProfileRequest = (requestBody) => (
    axios.put(requestUrl(ROOMMATES_PROFILE_API), requestBody, authorizedConfig())
);
