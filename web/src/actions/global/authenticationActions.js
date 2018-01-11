import * as ActionTypes from "../actionTypes";

const mockAPI = (code) => {
    console.log(code);
    return new Promise((fulfill, reject) => {
        setTimeout(() => {
            fulfill({statusCode: 200, message: 'OK'})
        }, 1000)
    });
};

export const fetchAuthToken = code => dispatch => {
    dispatch(fetchAuthTokenRequest());
    mockAPI(code)
        .then(
            response => {
                dispatch(fetchAuthTokenComplete(response.statusCode, response.message));
            },
            error => {
                dispatch(fetchAuthTokenComplete(error.statusCode, error.message));
                console.log("implement error handling");
            }
        )
};

const fetchAuthTokenRequest = () => ({type: ActionTypes.FETCH_AUTH_TOKEN_REQUEST});
const fetchAuthTokenComplete = (statusCode, message) => (
    {
        type: ActionTypes.FETCH_AUTH_TOKEN_COMPLETE,
        statusCode,
        message
    }
);
