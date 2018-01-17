import * as ActionTypes from "../actionTypes";
import axios from 'axios';
import {LOGIN_API, requestUrl} from "../../constants/api";
import {showInfoBar} from "./globalActions";

export const fetchAuthToken = code => dispatch => {
    dispatch(fetchAuthTokenRequest());
    axios.get(requestUrl(LOGIN_API)+`?auth=${code}`, {withCredentials: true})
        .then((response) => {
            dispatch(fetchAuthTokenComplete(200, "OK"));
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
