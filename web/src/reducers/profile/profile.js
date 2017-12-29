
import {
    RECEIVE_CLASSMATES_INFO, RECEIVE_FRIENDS_INFO, RECEIVE_MATCHED_USERS, RECEIVE_PERSONAL_INFO,
    RECEIVE_ROOMMATES_INFO, UPDATE_CLASSMATES_VALUES, UPDATE_FRIENDS_VALUES, UPDATE_PERSONAL_VALUES,
    UPDATE_ROOMMATES_VALUES
} from "../../actions/actionTypes";

const initialState = {
    classmates: {
        values: {
            major: '',
            courses: [],
            motto: '',
            tags: [],
        },
        options: {
            majorOptions: [],
            coursesOptions: [],
            tagsOptions: []
        }
    },
    roommates: {
        values: {
            location: '',
            hometown: '',
            motto: '',
            tags: [],
        },
        options: {
            locationOptions: [],
            hometownOptions: [],
            tagsOptions: [],
        }
    },
    friends: {
        values: {
            faculty: '',
            relationship: '',
            motto: '',
            tags: [],
        },
        options: {
            facultyOptions: [],
            relationshipOptions: [],
            tagsOptions: [],
        }
    },
    personal: {
        values: {
            profile_images: [],
            age: 0,
            constellation: ''
        },
        options: {
            constellationOptions: []
        }
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
            return Object.assign({}, state, {classmates: {values: action.classmatesValues, options: state.classmates.options}});
        case UPDATE_ROOMMATES_VALUES:
            return Object.assign({}, state, {roommates: {values: action.roommatesValues, options: state.roommates.options}});
        case UPDATE_FRIENDS_VALUES:
            return Object.assign({}, state, {friends: {values: action.friendsValues, options: state.friends.options}});
        case UPDATE_PERSONAL_VALUES:
            return Object.assign({}, state, {personal: {values: action.personalValues, options: state.personal.options}});
        default:
            return state;
    }
};

export default profile;
