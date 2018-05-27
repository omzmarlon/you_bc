import axios from 'axios';
import {
    authorizedConfig,
    CLASSMATES_PROFILE_API,
    FRIENDS_PROFILE_API, MATCHED_USERS_API, PERSONAL_PROFILE_API,
    requestUrl,
    ROOMMATES_PROFILE_API
} from "../constants/api";


export const getClassmatesProfileRequest = () => (
    axios.get(requestUrl(CLASSMATES_PROFILE_API), authorizedConfig())
);


export const getRoommatesProfileRequest = () => (
    axios.get(requestUrl(ROOMMATES_PROFILE_API), authorizedConfig())
);


export const getFriendsProfileRequest = () => (
    axios.get(requestUrl(FRIENDS_PROFILE_API), authorizedConfig())
);

export const getPersonalProfileRequest = () => (
    axios.get(requestUrl(PERSONAL_PROFILE_API), authorizedConfig())
);

export const getMatchedUsersRequest = () => (
    axios.get(requestUrl(MATCHED_USERS_API), authorizedConfig())
);