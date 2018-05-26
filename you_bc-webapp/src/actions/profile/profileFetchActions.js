import {
    RECEIVE_CLASSMATES_INFO, RECEIVE_FRIENDS_INFO, RECEIVE_MATCHED_USERS,
    RECEIVE_PERSONAL_INFO, RECEIVE_ROOMMATES_INFO
} from "../actionTypes";
import axios from 'axios';
import {
    authorizedConfig,
    CLASSMATES_PROFILE_API, FRIENDS_PROFILE_API, MATCHED_USERS_API, PERSONAL_PROFILE_API, requestUrl,
    ROOMMATES_PROFILE_API
} from "../../constants/api";
import {showInfoBar} from "../global/globalActions";



// user fetch for own classmates module data
export const receiveClassmatesInfo = (classmates) => ({type: RECEIVE_CLASSMATES_INFO, classmates});

export const fetchClassmatesInfo = () => dispatch => {
    axios.get(requestUrl(CLASSMATES_PROFILE_API), authorizedConfig())
        .then( response => {
            dispatch(receiveClassmatesInfo({
                major: response.data.major? response.data.major: '',
                courses: response.data.courses,
                motto: response.data.motto? response.data.motto: '',
                tags: response.data.tags
            }))
        }).catch( err => {
            // TODO: centralize error handling
            //dispatch(showInfoBar("未填写找课友信息"));
            if (err.response.data.error) {
                console.log(err.response.data.error);
            }
        });
};

// user fetch for own roommates module data
export const receiveRoommatesInfo = (roommates) => ({type: RECEIVE_ROOMMATES_INFO, roommates});

export const fetchRoommatesInfo = () => dispatch => {
    axios.get(requestUrl(ROOMMATES_PROFILE_API), authorizedConfig())
        .then( response => {
            dispatch(receiveRoommatesInfo({
                location: response.data.location? response.data.location: '',
                hometown: response.data.hometown? response.data.hometown: '',
                motto: response.data.motto? response.data.motto: '',
                tags: response.data.tags,
            }))
        }).catch( err => {
        // TODO: centralize error handling
            //dispatch(showInfoBar("未填写找室友信息"));
            if (err.response.data.error) {
                console.log(err.response.data.error);
            }
        });
};

// user fetch for own friends module data
export const receiveFriendsInfo = (friends) => ({type: RECEIVE_FRIENDS_INFO, friends});

export const fetchFriendsInfo = () => dispatch => {
    axios.get(requestUrl(FRIENDS_PROFILE_API), authorizedConfig())
        .then( response => {
            dispatch(receiveFriendsInfo({
                faculty: response.data.faculty? response.data.faculty: '',
                relationship: response.data.relationship? response.data.relationship: '',
                motto: response.data.motto? response.data.motto: '',
                tags: response.data.tags,
            }));
        }).catch( err => {
        // TODO: centralize error handling
        //dispatch(showInfoBar("未填写找X友信息"));
        if (err.response.data.error) {
            console.log(err.response.data.error);
        }
    });
};

// user fetch for personal info data
export const receivePersonalInfo = (personal) => ({type: RECEIVE_PERSONAL_INFO, personal});

export const fetchPersonalInfo = () => dispatch => {
    axios.get(requestUrl(PERSONAL_PROFILE_API), authorizedConfig())
        .then(response => {
            let sex = '';
            if (response.data.sex) {
                if (response.data.sex === 1) {
                    sex = 'Male';
                } else if (response.data.sex === 2) {
                    sex = 'Female';
                }
            }
            dispatch(receivePersonalInfo({
                avatar: response.data.avatarUrl? response.data.avatarUrl: '',
                age: response.data.horoscope? response.data.age: 0,
                constellation: response.data.horoscope? response.data.horoscope: '',
                username: response.data.username? response.data.username: '',
                sex: sex,
                weChatId: response.data.weChatId? response.data.weChatId: '',
            }));
        }, err => {
            // TODO: centralize error handling
            dispatch(showInfoBar("Failed to fetch basic info"));
            if (err.response.data.error) {
                console.log(err.response.data.error);
            }
        });
};

export const receiveMatchedUsers = (matchedUsers, newMatch) => ({type: RECEIVE_MATCHED_USERS, matchedUsers, newMatch});

// fetch matched users

export const fetchMatchedUsers = () => dispatch => {
    // workaround: add newMatch; update store through receiveMatchedUsers() action
    axios.get(requestUrl(MATCHED_USERS_API), authorizedConfig()).then(
        response => {
            let newMatch = response.data.newMatch;
            let users = response.data.matchedUsers.map(data => ({
                avatarURL: data.avatarURL,
                username: data.name,
                weChatId: data.weChatId,
                matchedAtClassmates: data.matchedAtClassmates,
                matchedAtRoommates: data.matchedAtRoommates,
                matchedAtFriends: data.matchedAtFriends
            }));
            dispatch(receiveMatchedUsers(users, newMatch));
        },
        err => {
            // TODO: centralize error handling
            dispatch(showInfoBar("Failed to fetch matched users"));
            if (err.response.data.error) {
                console.log(err.response.data.error);
            }
        }
    );
};

