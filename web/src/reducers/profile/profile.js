
import {
    RECEIVE_CLASSMATES_INFO, RECEIVE_FRIENDS_INFO,
    RECEIVE_MATCHED_USERS, RECEIVE_PERSONAL_INFO,
    RECEIVE_ROOMMATES_INFO, UPDATE_AVATAR, UPDATE_CLASSMATES_VALUES, UPDATE_FRIENDS_VALUES, UPDATE_PERSONAL_VALUES,
    UPDATE_ROOMMATES_VALUES, UPDATE_WECHAT_ID
} from "../../actions/actionTypes";

const initialState = {
    classmates: {
        major: '',
        courses: [],
        motto: '',
        tags: [],
    },
    roommates: {
        location: '',
        hometown: '',
        motto: '',
        tags: [],
    },
    friends: {
        faculty: '',
        relationship: '',
        motto: '',
        tags: [],
    },
    personal: {
        age: 0,
        constellation: '',
        username: '',
        sex: '',
        // these are updated separately
        avatar: '',
        weChatId: ''
    },
    matchedUsers: [],

    // survey...
};

const profile = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_CLASSMATES_INFO:
            return {...state, classmates: action.classmates};
        case RECEIVE_ROOMMATES_INFO:
            return {...state, roommates: action.roommates};
        case RECEIVE_FRIENDS_INFO:
            return {...state, friends: action.friends};
        case RECEIVE_PERSONAL_INFO:
            return {...state, personal: action.personal};
        case RECEIVE_MATCHED_USERS:
            return {...state, matchedUsers: action.matchedUsers};
        case UPDATE_CLASSMATES_VALUES:
            return {...state, classmates: action.classmatesValues};
        case UPDATE_ROOMMATES_VALUES:
            return {...state, roommates: action.roommatesValues};
        case UPDATE_FRIENDS_VALUES:
            return {...state, friends: action.friendsValues};
        case UPDATE_PERSONAL_VALUES: // avatar & weChatId is updated separately
            return {
                ...state,
                personal: {
                    avatar: state.personal.avatar,
                    weChatId: state.personal.weChatId,
                    ...action.personalValues
                }
            };
        case UPDATE_WECHAT_ID:
            return {
                ...state,
                personal: {
                    ...state.personal,
                    weChatId: action.weChatId
                }
            };
        case UPDATE_AVATAR:
            return {
                ...state,
                personal: {
                    ...state.personal,
                    avatar: action.avatar,
                }
            };
        default:
            return state;
    }
};

export default profile;
