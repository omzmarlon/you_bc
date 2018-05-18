import * as ActionTypes from "../actionTypes";
import axios from 'axios';
import {LOGIN_API, REGISTER_API, requestUrl} from "../../constants/api";
import {showInfoBar} from "./globalActions";
import {fetchVerification} from "./verificationActions";

// todo: old, clean up
export const fetchAuthToken = code => dispatch => {

    dispatch(fetchAuthTokenRequest());
    axios.get(requestUrl(LOGIN_API)+`?auth=${code}`, {withCredentials: true})
        .then((response) => {
            dispatch(fetchAuthTokenComplete(200, "OK"));
            // TODO: verification shouldn't be here
            dispatch(fetchVerification());
        })
        .catch((err) => {
            dispatch(fetchAuthTokenComplete(401, err.response.data.message));
            dispatch(showInfoBar(err.response.data.message));
        });
};

const fetchAuthTokenRequest = () => ({type: ActionTypes.FETCH_AUTH_TOKEN_REQUEST});
export const fetchAuthTokenComplete = (statusCode, message) => (
    {
        type: ActionTypes.FETCH_AUTH_TOKEN_COMPLETE,
        statusCode,
        message
    }
);

// new
export const loginAction = (username, password) => dispatch => {
    dispatch(loginRequest());
    axios.post(requestUrl(LOGIN_API), {username, password})
        .then(
            response => {
                dispatch(loginComplete(200, 'OK'));
            },
            error => {
                console.log(error);
                console.log("inside then!!!");
                dispatch(loginComplete(401, error.response.data.message));
                dispatch(showInfoBar(error.response.data.message));
            }
        )
        .catch(
            error => {
                console.log(error);
                console.log("inside catch!!!");
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
    dispatch(registerRequest());
    axios.post(requestUrl(REGISTER_API), {username, password, sex})
        .then(
            response => {
                dispatch(registerComplete(200, 'OK'));
            },
            error => {
                // todo: confirm the error code and error struct
                console.log(error);
                console.log("inside then!!!");
                dispatch(registerComplete(401, error.response.data.message));
                dispatch(showInfoBar(error.response.data.message));
            }
        )
        .catch(
            error => {
                console.log(error);
                console.log("inside catch!!!");
            }
        )
};
const registerRequest = () => ({type: ActionTypes.REGISTER_REQUEST});
const registerComplete = (statusCode, message) => (
    {
        type: ActionTypes.REGISTER_COMPLETE,
        statusCode,
        message
    }
);