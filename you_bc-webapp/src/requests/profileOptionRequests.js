import axios from 'axios';
import {
    authorizedConfig,
    CLASSMATES_TAGS_OPTIONS_API, COURSES_OPTIONS_API, FACULTIES_OPTIONS_API, FRIENDS_TAGS_API, HOMETOWN_OPTIONS_API,
    LOCATION_OPTIONS_API,
    MAJOR_OPTIONS_API, RELATIONSHIP_OPTIONS_API,
    requestUrl, ROOMMATES_TAGS_OPTIONS_API
} from "../constants/api";

export function getCourseOptions(filter) {
    return axios.get(
        requestUrl(`${COURSES_OPTIONS_API}?filter=${filter?filter:''}`),
        authorizedConfig()
    );
}

export function getMajorOptions() {
    return axios.get(requestUrl(MAJOR_OPTIONS_API), authorizedConfig());
}

export function getClassmatesTags() {
    return axios.get(requestUrl(CLASSMATES_TAGS_OPTIONS_API), authorizedConfig());
}

export function getLocationsOptions() {
    return axios.get(requestUrl(LOCATION_OPTIONS_API), authorizedConfig());
}

export function getHometownOptions() {
    return axios.get(requestUrl(HOMETOWN_OPTIONS_API), authorizedConfig());
}

export function getRoommatesTags() {
    return axios.get(requestUrl(ROOMMATES_TAGS_OPTIONS_API), authorizedConfig());
}

export function getFacultyOptions() {
    return axios.get(requestUrl(FACULTIES_OPTIONS_API), authorizedConfig());
}


export function getRelationshipOptions() {
    return axios.get(requestUrl(RELATIONSHIP_OPTIONS_API), authorizedConfig());
}

export function getFriendsTags() {
    return axios.get(requestUrl(FRIENDS_TAGS_API), authorizedConfig());
}
