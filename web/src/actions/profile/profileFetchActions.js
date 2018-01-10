import {
    RECEIVE_CLASSMATES_INFO, RECEIVE_FRIENDS_INFO, RECEIVE_MATCHED_USERS, RECEIVE_PERSONAL_INFO,
    RECEIVE_ROOMMATES_INFO
} from "../actionTypes";

// user fetch for own classmates module data
export const receiveClassmatesInfo = (classmates) => ({type: RECEIVE_CLASSMATES_INFO, classmates});

export const fetchClassmatesInfo = () => dispatch => {
    // TODO: connect with backend API
    return Promise.resolve(
            {
                values: {
                    major: '',
                    courses: [],
                    motto: '',
                    tags: [],
                },
                options: {
                    majorOptions: ['CPSC', 'ECON', 'COMM', 'CHEM', 'PHYS'],
                    coursesOptions: ['CPSC 310', 'CPSC 340', 'MATH 307',
                        'CPSC 304', 'ENG 112', 'MATH 302', 'MATH 104', 'MATH 105', 'ECON 102', 'ECON 101'],
                    tagsOptions: ['Good', 'Great', 'Handsome', 'Ugly']
                }
            }
        ).then(
            response => dispatch(receiveClassmatesInfo(response)),
            err => console.log('implement certain error handling')
        );
};

// user fetch for own roommates module data
export const receiveRoommatesInfo = (roommates) => ({type: RECEIVE_ROOMMATES_INFO, roommates});

export const fetchRoommatesInfo = () => dispatch => {
    // TODO: connect with backend API
    return Promise.resolve(
        {
            values: {
                location: '',
                hometown: '',
                motto: '',
                tags: [],
            },
            options: {
                locationOptions: ['West Vancouver', 'Wesbrook Village', 'On campus'],
                hometownOptions: ['福州', '北京', '重庆', '上海', '广东'],
                tagsOptions: ['Clean', 'Early', 'Dirty', 'Late'],
            }
        }
    ).then(
        response => dispatch(receiveRoommatesInfo(response)),
        err => console.log('implement certain error handling')
    )
};

// user fetch for own friends module data
export const receiveFriendsInfo = (friends) => ({type: RECEIVE_FRIENDS_INFO, friends});

export const fetchFriendsInfo = () => dispatch => {
    // TODO: connect with backend API
    return Promise.resolve(
        {
            values: {
                faculty: '',
                relationship: '',
                motto: '',
                tags: [],
            },
            options: {
                facultyOptions: ['Science', 'Forestry', 'Sauder', 'Arts'],
                relationshipOptions: ['单身', '恋爱中'],
                tagsOptions: ['Coding', '约', 'Coffee', 'photography', 'Hiking'],
            }
        }
    ).then(
        response => dispatch(receiveFriendsInfo(response)),
        err => console.log('implement certain error handling')
    );
};

// user fetch for personal info data
export const receivePersonalInfo = (personal) => ({type: RECEIVE_PERSONAL_INFO, personal});

export const fetchPersonalInfo = () => dispatch => {
    // TODO: connect with backend API
    return Promise.resolve({
        values: {
            avatar: 'https://avatars0.githubusercontent.com/u/13238492?s=400&u=7716e4db99ffa98e20544d42520538a0a1f9cb79&v=4',
            age: 0,
            constellation: ''
        },
        options: {
            constellationOptions: [
                "天蝎座", "水瓶座", "狮子座", "白羊座", "摩羯座", "巨蟹座", "天秤座", "金牛座", "双子座", "处女座", "双鱼座", "射手座"
            ]
        }
    }).then(
        response => dispatch(receivePersonalInfo(response)),
        err => console.log('implement certain error handling')
    );
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

