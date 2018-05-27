import * as ActionTypes from "../actionTypes";
import {UPDATE_AUTH_DETAIL, UPDATE_AUTH_STATUS_CODE} from "../actionTypes";
import {showInfoBar} from "./globalActions";
import LocalStorage from "../../utils/LocalStorage";
import AuthStatus from "../../utils/AuthStatus";
import {removeAuthToken} from "../../utils/AuthService";
import {getAuthStatusRequest} from "../../requests/authenticationRequests";

export const updateAuthStatusCode = (authStatusCode) => ({
    type: UPDATE_AUTH_STATUS_CODE, authStatusCode
});

export const updateAuthDetail = (authDetail) => ({
    type: UPDATE_AUTH_DETAIL, authDetail
});

export const  fetchAuthStatus = () => dispatch => {
    getAuthStatusRequest()
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