
import {
    RECEIVE_CLASSMATES_INFO, RECEIVE_CLASSMATES_TAGS, RECEIVE_COURSES_OPTIONS, RECEIVE_FACULTIES_OPTIONS,
    RECEIVE_FRIENDS_INFO, RECEIVE_FRIENDS_TAGS,
    RECEIVE_HOMETOWNS_OPTIONS,
    RECEIVE_LOCATIONS_OPTIONS,
    RECEIVE_MAJORS_OPTIONS,
    RECEIVE_MATCHED_USERS, RECEIVE_PERSONAL_INFO, RECEIVE_RELATIONSHIP_STATUSES_OPTIONS, RECEIVE_ROOMMATE_TAGS,
    RECEIVE_ROOMMATES_INFO, UPDATE_AVATAR, UPDATE_CLASSMATES_VALUES, UPDATE_FRIENDS_VALUES, UPDATE_PERSONAL_VALUES,
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
            avatar: '',
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
            return {...state, classmates: {values: action.classmates, options: state.classmates.options}};
        case RECEIVE_ROOMMATES_INFO:
            return {...state, roommates: {values: action.roommates, options: state.roommates.options}};
        case RECEIVE_FRIENDS_INFO:
            return {...state, friends: {values: action.friends, options: state.friends.options}};
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
        case UPDATE_PERSONAL_VALUES: // avatar is updated separately
            return {
                ...state,
                personal: {
                    values: {
                        avatar: state.personal.values.avatar,
                        ...action.personalValues
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
        // menu options
        case RECEIVE_MAJORS_OPTIONS:
            return {...state,
                classmates: {
                    values: {...state.classmates.values},
                    options: {
                        majorOptions: action.majorOptions,
                        coursesOptions: state.classmates.options.coursesOptions,
                        tagsOptions: state.classmates.options.tagsOptions
                    }
                }
            };
        case RECEIVE_COURSES_OPTIONS:
            return {...state,
                classmates: {
                    values: {...state.classmates.values},
                    options: {
                        majorOptions: state.classmates.options.majorOptions,
                        coursesOptions: action.coursesOptions,
                        tagsOptions: state.classmates.options.tagsOptions
                    }
                }
            };
        case RECEIVE_CLASSMATES_TAGS:
            return {...state,
                classmates: {
                    values: {...state.classmates.values},
                    options: {
                        majorOptions: state.classmates.options.majorOptions,
                        coursesOptions: state.classmates.options.coursesOptions,
                        tagsOptions: action.classmatesTags
                    }
                }
            };
        case RECEIVE_LOCATIONS_OPTIONS:
            return {...state,
                roommates: {
                    values: {...state.roommates.values},
                    options: {
                        locationOptions: action.locationOptions,
                        hometownOptions: state.roommates.options.hometownOptions,
                        tagsOptions: state.roommates.options.tagsOptions
                    }
                }
            };
        case RECEIVE_HOMETOWNS_OPTIONS:
            return {...state,
                roommates: {
                    values: {...state.roommates.values},
                    options: {
                        locationOptions: state.roommates.options.locationOptions,
                        hometownOptions: action.hometownOptions,
                        tagsOptions: state.roommates.options.tagsOptions
                    }
                }
            };
        case RECEIVE_ROOMMATE_TAGS:
            return {...state,
                roommates: {
                    values: {...state.roommates.values},
                    options: {
                        locationOptions: state.roommates.options.locationOptions,
                        hometownOptions: state.roommates.options.hometownOptions,
                        tagsOptions: action.roommatesTags
                    }
                }
            };
        case RECEIVE_FACULTIES_OPTIONS:
            return {...state,
                friends: {
                    values: {...state.friends.values},
                    options: {
                        facultyOptions: action.facultyOptions,
                        relationshipOptions: state.friends.options.relationshipOptions,
                        tagsOptions: state.friends.options.tagsOptions,
                    }
                }
            };
        case RECEIVE_RELATIONSHIP_STATUSES_OPTIONS:
            return {...state,
                friends: {
                    values: {...state.friends.values},
                    options: {
                        facultyOptions: state.friends.options.facultyOptions,
                        relationshipOptions: action.relationshipOptions,
                        tagsOptions: state.friends.options.tagsOptions,
                    }
                }
            };
        case RECEIVE_FRIENDS_TAGS:
            return {...state,
                friends: {
                    values: {...state.friends.values},
                    options: {
                        facultyOptions: state.friends.options.facultyOptions,
                        relationshipOptions: state.friends.options.relationshipOptions,
                        tagsOptions: action.friendsTags
                    }
                }
            };
        default:
            return state;
    }
};

export default profile;
