import * as ActionTypes from "../actionTypes";
import axios from 'axios';
import {AUTH_STATUS_API, authorizedConfig, LOGIN_API, REGISTER_API, requestUrl} from "../../constants/api";
import {showInfoBar} from "./globalActions";
import {showGlobalSpinner, hideGlobalSpinner} from "../../actions/global/globalActions";
import LocalStorage from "../../utils/LocalStorage";
import AuthStatus from "../../utils/AuthStatus";
import {UPDATE_AUTH_STATUS_CODE} from "../actionTypes";
import {UPDATE_AUTH_DETAIL} from "../actionTypes";
import {removeAuthToken} from "../../utils/AuthService";

export const loginPostRequest = (username, password) => (
    axios.post(requestUrl(LOGIN_API), {username, password})
);

export const loginRequest = () => ({type: ActionTypes.LOGIN_REQUEST});
export const loginComplete = (statusCode, message) => (
    {
        type: ActionTypes.LOGIN_COMPLETE,
        statusCode,
        message
    }
);

export const registerPostRequest = (username, password, sex) => (
    axios.post(requestUrl(REGISTER_API), {username, password, sex})
);

export const updateAuthStatusCode = (authStatusCode) => ({
    type: UPDATE_AUTH_STATUS_CODE, authStatusCode
});

export const updateAuthDetail = (authDetail) => ({
    type: UPDATE_AUTH_DETAIL, authDetail
});

export const  fetchAuthStatus = () => dispatch => {
    axios.get(requestUrl(AUTH_STATUS_API), authorizedConfig())
        .then(
            response => {
                const {username, newToken} = response.data;
                dispatch(updateAuthDetail({username}));
                localStorage.setItem(LocalStorage.AUTH_TOKEN_STORAGE, newToken)

                dispatch(updateAuthStatusCode(AuthStatus.AUTH_SUCCESS));
                dispatch(showInfoBar(`Hey ${username}, welcome back!`));
            },
            error => {
                dispatch(updateAuthStatusCode(AuthStatus.UNAUTHORIZED));
                console.log(error)
            }
        )
        .catch(err => {});
};

export const signOut = () => dispatch => {
    dispatch(signOutAction());
    removeAuthToken();
};

const signOutAction = () => ({type: ActionTypes.SIGN_OUT});