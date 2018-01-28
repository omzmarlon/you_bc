// fetch for menu options
import {
    RECEIVE_CLASSMATES_TAGS, RECEIVE_COURSES_OPTIONS, RECEIVE_FACULTIES_OPTIONS, RECEIVE_FRIENDS_TAGS,
    RECEIVE_HOMETOWNS_OPTIONS,
    RECEIVE_LOCATIONS_OPTIONS,
    RECEIVE_MAJORS_OPTIONS, RECEIVE_RELATIONSHIP_STATUSES_OPTIONS, RECEIVE_ROOMMATE_TAGS
} from "../actionTypes";
import axios from 'axios';
import {
    CLASSMATES_TAGS_OPTIONS_API, COURSES_OPTIONS_API, FACULTIES_OPTIONS_API, FRIENDS_TAGS_API, HOMETOWN_OPTIONS_API,
    LOCATION_OPTIONS_API,
    MAJOR_OPTIONS_API, RELATIONSHIP_OPTIONS_API,
    requestUrl, ROOMMATES_TAGS_OPTIONS_API
} from "../../constants/api";
import {showInfoBar} from "../global/globalActions";

export const receiveMajorOptions = (majorOptions) => ({type: RECEIVE_MAJORS_OPTIONS, majorOptions});
export const receiveCoursesOptions = (coursesOptions) => ({type: RECEIVE_COURSES_OPTIONS, coursesOptions});
export const receiveClassmatesTags = (classmatesTags) => ({type: RECEIVE_CLASSMATES_TAGS, classmatesTags});
export const receiveLocationOptions = (locationOptions) => ({type: RECEIVE_LOCATIONS_OPTIONS, locationOptions});
export const receiveHometownOptions = (hometownOptions) => ({type: RECEIVE_HOMETOWNS_OPTIONS, hometownOptions});
export const receiveRoommateTags = (roommatesTags) => ({type: RECEIVE_ROOMMATE_TAGS, roommatesTags});
export const receiveFaculties = (facultyOptions) => ({type: RECEIVE_FACULTIES_OPTIONS, facultyOptions});
export const receiveRelationshipOptions = (relationshipOptions) => ({type: RECEIVE_RELATIONSHIP_STATUSES_OPTIONS, relationshipOptions});
export const receiveFriendsTags = (friendsTags) => ({type: RECEIVE_FRIENDS_TAGS, friendsTags});

export const fetchMajors = () => dispatch => {
    return axios.get(requestUrl(MAJOR_OPTIONS_API), {withCredentials: true})
        .then(res => {
            dispatch(receiveMajorOptions(res.data))
        })
        .catch(err => {
            // TODO: centralize error handling
            dispatch(showInfoBar("获取专业选项失败"));
            if (err.response.data.error) {
                console.log(err.response.data.error);
            }
        });
};

export const fetchCourses = (filter) => dispatch => {
    return axios.get(requestUrl(`${COURSES_OPTIONS_API}?filter=${filter?filter:''}`), {withCredentials: true})
        .then(res => {
            dispatch(receiveCoursesOptions(res.data))
        })
        .catch(err => {
            // TODO: centralize error handling
            dispatch(showInfoBar("获取课程选项失败"));
            if (err.response.data.error) {
                console.log(err.response.data.error);
            }
        });
};

export const fetchClassmatesTags = () => dispatch => {
    return axios.get(requestUrl(CLASSMATES_TAGS_OPTIONS_API), {withCredentials: true})
        .then(res => {
            dispatch(receiveClassmatesTags(res.data))
        })
        .catch(err => {
            // TODO: centralize error handling
            dispatch(showInfoBar("获取找课友标签失败"));
            if (err.response.data.error) {
                console.log(err.response.data.error);
            }
        });
};

export const fetchLocationOptions = () => dispatch => {
    return axios.get(requestUrl(LOCATION_OPTIONS_API), {withCredentials: true})
        .then(response => {
            dispatch(receiveLocationOptions(response.data));
        })
        .catch(err => {
            // TODO: centralize error handling
            dispatch(showInfoBar("获取找室友地点失败"));
            if (err.response.data.error) {
                console.log(err.response.data.error);
            }
        });
};

export const fetchHometownOptions = () => dispatch => {
    return axios.get(requestUrl(HOMETOWN_OPTIONS_API), {withCredentials: true})
        .then(response => {
            dispatch(receiveHometownOptions(response.data));
        })
        .catch(err => {
            // TODO: centralize error handling
            dispatch(showInfoBar("获取家乡信息失败"));
            if (err.response.data.error) {
                console.log(err.response.data.error);
            }
        });
};

export const fetchRoommatesTags = () => dispatch => {
    return axios.get(requestUrl(ROOMMATES_TAGS_OPTIONS_API), {withCredentials: true})
        .then(response => {
            dispatch(receiveRoommateTags(response.data));
        })
        .catch(err=> {
            // TODO: centralize error handling
            dispatch(showInfoBar("获取找室友标签失败"));
            if (err.response.data.error) {
                console.log(err.response.data.error);
            }
        });
};

export const fetchFaculties = () => dispatch => {
    return axios.get(requestUrl(FACULTIES_OPTIONS_API), {withCredentials: true})
        .then(response => {
            dispatch(receiveFaculties(response.data));
        })
        .catch(err=> {
            // TODO: centralize error handling
            dispatch(showInfoBar("获取学院信息失败"));
            if (err.response.data.error) {
                console.log(err.response.data.error);
            }
        });
};


export const fetchRelationship = () => dispatch => {
    return axios.get(requestUrl(RELATIONSHIP_OPTIONS_API), {withCredentials: true})
        .then(response => {
            dispatch(receiveRelationshipOptions(response.data));
        })
        .catch(err=> {
            dispatch(showInfoBar("获取情感选项失败"));
            if (err.response.data.error) {
                console.log(err.response.data.error);
            }
        });
};

export const fetchFriendsTags = () => dispatch => {
    return axios.get(requestUrl(FRIENDS_TAGS_API), {withCredentials: true})
        .then(response => {
            dispatch(receiveFriendsTags(response.data));
        })
        .catch(err=> {
            dispatch(showInfoBar("获取情感选项失败"));
            if (err.response.data.error) {
                console.log(err.response.data.error);
            }
        });
};
