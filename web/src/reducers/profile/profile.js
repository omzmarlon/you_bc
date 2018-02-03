
import {
    RECEIVE_CLASSMATES_INFO, RECEIVE_CLASSMATES_TAGS, RECEIVE_COURSES_OPTIONS, RECEIVE_FACULTIES_OPTIONS,
    RECEIVE_FRIENDS_INFO, RECEIVE_FRIENDS_TAGS,
    RECEIVE_HOMETOWNS_OPTIONS,
    RECEIVE_LOCATIONS_OPTIONS,
    RECEIVE_MAJORS_OPTIONS,
    RECEIVE_MATCHED_USERS, RECEIVE_PERSONAL_INFO, RECEIVE_RELATIONSHIP_STATUSES_OPTIONS, RECEIVE_ROOMMATE_TAGS,
    RECEIVE_ROOMMATES_INFO, UPDATE_AVATAR, UPDATE_CLASSMATES_VALUES, UPDATE_FRIENDS_VALUES, UPDATE_PERSONAL_VALUES,
    UPDATE_ROOMMATES_VALUES, UPDATE_WECHAT_ID
} from "../../actions/actionTypes";

const initialState = {
    classmates: {
        values: {
            major: '',
            courses: [],
            motto: '',
            tags: [],
        }
    },
    roommates: {
        values: {
            location: '',
            hometown: '',
            motto: '',
            tags: [],
        }
    },
    friends: {
        values: {
            faculty: '',
            relationship: '',
            motto: '',
            tags: [],
        }
    },
    personal: {
        values: {
            age: 0,
            constellation: '',
            username: '',
            sex: '',
            // these are updated separately
            avatar: '',
            weChatId: ''
        }
    },
    matchedUsers: [],

    // survey...
};

const profile = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_CLASSMATES_INFO:
            return {...state, classmates: {values: action.classmates, options: state.classmates.options}};
        case RECEIVE_ROOMMATES_INFO:
            return {...state, roommates: {values: action.roommates, options: state.roommates.options}};
        case RECEIVE_FRIENDS_INFO:
            return {...state, friends: {values: action.friends, options: state.friends.options}};
        case RECEIVE_PERSONAL_INFO:
            return {...state, personal: {values: action.personal, options: state.personal.options}};
        case RECEIVE_MATCHED_USERS:
            return {...state, matchedUsers: action.matchedUsers};
        case UPDATE_CLASSMATES_VALUES:
            return Object.assign({}, state, {classmates: {values: action.classmatesValues, options: state.classmates.options}});
        case UPDATE_ROOMMATES_VALUES:
            return Object.assign({}, state, {roommates: {values: action.roommatesValues, options: state.roommates.options}});
        case UPDATE_FRIENDS_VALUES:
            return Object.assign({}, state, {friends: {values: action.friendsValues, options: state.friends.options}});
        case UPDATE_PERSONAL_VALUES: // avatar & weChatId is updated separately
            return {
                ...state,
                personal: {
                    values: {
                        avatar: state.personal.values.avatar,
                        weChatId: state.personal.values.weChatId,
                        ...action.personalValues
                    },
                    options: state.personal.options
                }
            };
        case UPDATE_WECHAT_ID:
            return {
                ...state,
                personal: {
                    values: {
                        ...state.personal.values,
                        weChatId: action.weChatId
                    },
                    options: state.personal.options
                }
            };
        case UPDATE_AVATAR:
            return {
                ...state,
                personal: {
                    values: {
                        ...state.personal.values,
                        avatar: action.avatar,
                    },
                    options: state.personal.options
                }
            };
        default:
            return state;
    }
};

export default profile;
