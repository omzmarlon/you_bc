import * as ActionTypes from "../actionTypes";
import axios from 'axios';
import {AUTH_STATUS_API, authorizedConfig, LOGIN_API, REGISTER_API, requestUrl} from "../../constants/api";
import {showInfoBar} from "./globalActions";
import {showGlobalSpinner, hideGlobalSpinner} from "../../actions/global/globalActions";
import LocalStorage from "../../utils/LocalStorage";
import AuthStatus from "../../utils/AuthStatus";
import {UPDATE_AUTH_STATUS_CODE} from "../actionTypes";
import {UPDATE_AUTH_DETAIL} from "../actionTypes";

export const loginAction = (username, password) => dispatch => {
    dispatch(showGlobalSpinner());
    dispatch(loginRequest());
    axios.post(requestUrl(LOGIN_API), {username, password})
        .then(
            response => {
                dispatch(hideGlobalSpinner());
                if (response.data.token) {
                    const jwtToken = response.data.token;
                    localStorage.setItem(LocalStorage.AUTH_TOKEN_STORAGE, jwtToken);
                    dispatch(showInfoBar("Login Success!"));
                    dispatch(loginComplete(200, 'OK'));
                } else {
                    dispatch(showInfoBar("Could Not Get Authentication Token"));
                }
            },
            error => {
                // todo remove console log
                // todo centralize error handling
                console.log(error);
                console.log("inside then!!!");
                dispatch(hideGlobalSpinner());
                dispatch(loginComplete(401, error.response.data.message));
                dispatch(showInfoBar(error.response.data.message));
            }
        )
        .catch(
            error => {
                // todo centralize error handling
                // todo remove console log
                console.log(error);
                console.log("inside catch!!!");
                dispatch(hideGlobalSpinner());

            }
        )
};
const loginRequest = () => ({type: ActionTypes.LOGIN_REQUEST});
const loginComplete = (statusCode, message) => (
    {
        type: ActionTypes.LOGIN_COMPLETE,
        statusCode,
        message
    }
);

export const registerAction = (username, password, sex) => dispatch => {
    dispatch(showGlobalSpinner());
    axios.post(requestUrl(REGISTER_API), {username, password, sex})
        .then(
            response => {
                dispatch(hideGlobalSpinner());
                dispatch(loginAction(username, password));
            },
            error => {
                // todo centralize error handling
                // todo: confirm the error code and error struct
                console.log(error);
                dispatch(hideGlobalSpinner());
                dispatch(showInfoBar(error.response.data.message));
            }
        )
        .catch(
            error => {
                // todo centralize error handling
                dispatch(hideGlobalSpinner());
            }
        )
};

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