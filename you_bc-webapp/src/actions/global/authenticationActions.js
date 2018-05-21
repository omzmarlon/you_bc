import * as ActionTypes from "../actionTypes";
import axios from 'axios';
import {LOGIN_API, REGISTER_API, requestUrl} from "../../constants/api";
import {showInfoBar} from "./globalActions";
import {showGlobalSpinner, hideGlobalSpinner} from "../../actions/global/globalActions";


export const loginAction = (username, password) => dispatch => {
    dispatch(showGlobalSpinner());
    dispatch(loginRequest());
    axios.post(requestUrl(LOGIN_API), {username, password})
        .then(
            response => {
                dispatch(hideGlobalSpinner());
                dispatch(loginComplete(200, 'OK'));
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
