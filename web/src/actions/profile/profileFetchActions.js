import {
    RECEIVE_CLASSMATES_INFO, RECEIVE_FRIENDS_INFO, RECEIVE_MATCHED_USERS,
    RECEIVE_PERSONAL_INFO, RECEIVE_ROOMMATES_INFO
} from "../actionTypes";
import axios from 'axios';
import {
    CLASSMATES_PROFILE_API, FRIENDS_PROFILE_API, PERSONAL_PROFILE_API, requestUrl,
    ROOMMATES_PROFILE_API
} from "../../constants/api";
import {showInfoBar} from "../global/globalActions";



// user fetch for own classmates module data
export const receiveClassmatesInfo = (classmates) => ({type: RECEIVE_CLASSMATES_INFO, classmates});

export const fetchClassmatesInfo = () => dispatch => {
    axios.get(requestUrl(CLASSMATES_PROFILE_API), {withCredentials: true})
        .then( response => {
            dispatch(receiveClassmatesInfo({
                major: response.data.major? response.data.major: '',
                courses: response.data.courses,
                motto: response.data.motto? response.data.motto: '',
                tags: response.data.tags
            }))
        }).catch( err => {
            // TODO: centralize error handling
            dispatch(showInfoBar("获取找课友信息失败"));
            if (err.response.data.error) {
                console.log(err.response.data.error);
            }
        });
};

// user fetch for own roommates module data
export const receiveRoommatesInfo = (roommates) => ({type: RECEIVE_ROOMMATES_INFO, roommates});

export const fetchRoommatesInfo = () => dispatch => {
    axios.get(requestUrl(ROOMMATES_PROFILE_API), {withCredentials: true})
        .then( response => {
            dispatch(receiveRoommatesInfo({
                location: response.data.location? response.data.location: '',
                hometown: response.data.hometown? response.data.hometown: '',
                motto: response.data.motto? response.data.motto: '',
                tags: response.data.tags,
            }))
        }).catch( err => {
        // TODO: centralize error handling
            dispatch(showInfoBar("获取找室友信息失败"));
            if (err.response.data.error) {
                console.log(err.response.data.error);
            }
        });
};

// user fetch for own friends module data
export const receiveFriendsInfo = (friends) => ({type: RECEIVE_FRIENDS_INFO, friends});

export const fetchFriendsInfo = () => dispatch => {
    axios.get(requestUrl(FRIENDS_PROFILE_API), {withCredentials: true})
        .then( response => {
            dispatch(receiveFriendsInfo({
                faculty: response.data.faculty? response.data.faculty: '',
                relationship: response.data.relationship? response.data.relationship: '',
                motto: response.data.motto? response.data.motto: '',
                tags: response.data.tags,
            }));
        }).catch( err => {
        // TODO: centralize error handling
        dispatch(showInfoBar("获取找X友信息失败"));
        if (err.response.data.error) {
            console.log(err.response.data.error);
        }
    });
};

// user fetch for personal info data
export const receivePersonalInfo = (personal) => ({type: RECEIVE_PERSONAL_INFO, personal});

export const fetchPersonalInfo = () => dispatch => {
    axios.get(requestUrl(PERSONAL_PROFILE_API), {withCredentials: true})
        .then(response => {
            let sex = '';
            if (response.data.sex) {
                if (response.data.sex === 1) {
                    sex = '男';
                } else if (response.data.sex === 2) {
                    sex = '女';
                }
            }
            dispatch(receivePersonalInfo({
                avatar: response.data.avatarUrl? response.data.avatarUrl: '',
                age: response.data.horoscope? response.data.age: '',
                constellation: response.data.horoscope? response.data.horoscope: '',
                username: response.data.username? response.data.username: '',
                sex: sex,
                weChatId: response.data.weChatId? response.data.weChatId: '',
            }));
        }, err => {
            // TODO: centralize error handling
            dispatch(showInfoBar("获取找个人信息失败"));
            if (err.response.data.error) {
                console.log(err.response.data.error);
            }
        });
};

export const receiveMatchedUsers = (matchedUsers) => ({type: RECEIVE_MATCHED_USERS, matchedUsers});

// fetch matched users
export const fetchMatchedUsers = () => dispatch => {
    // TODO: connect with backend API
    return Promise.resolve([
        {
            avatarURL: 'https://avatars0.githubusercontent.com/u/13238492?s=400&u=7716e4db99ffa98e20544d42520538a0a1f9cb79&v=4',
            username: 'omzmarlon',
            weChatId: 'omzmarlon',
            matchedAtClassmates: true,
            matchedAtRoommates: false,
            matchedAtFriends: true,
        },
        {
            avatarURL: 'https://avatars3.githubusercontent.com/u/15700985?s=460&v=4',
            username: 'tomyang',
            weChatId: 'studentom',
            matchedAtClassmates: true,
            matchedAtRoommates: true,
            matchedAtFriends: true,
        }
    ]).then(
        response => dispatch(receiveMatchedUsers(response)),
        err => console.log('implement certain error handling')
    );
};

