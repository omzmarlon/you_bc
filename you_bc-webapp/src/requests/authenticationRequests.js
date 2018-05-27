import axios from 'axios';
import {AUTH_STATUS_API, authorizedConfig, LOGIN_API, REGISTER_API, requestUrl} from "../constants/api";

export const postLoginRequest = (username, password) => (
    axios.post(requestUrl(LOGIN_API), {username, password})
);
export const postRegisterRequest = (username, password, sex) => (
    axios.post(requestUrl(REGISTER_API), {username, password, sex})
);

export const getAuthStatusRequest = () => (
    axios.get(requestUrl(AUTH_STATUS_API), authorizedConfig())
);