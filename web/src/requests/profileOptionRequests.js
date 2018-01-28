import axios from 'axios';
import {COURSES_OPTIONS_API, requestUrl} from "../constants/api";

export function getCourseOptions(filter) {
    return axios.get(
        requestUrl(`${COURSES_OPTIONS_API}?filter=${filter?filter:''}`),
        {withCredentials: true}
    );
}