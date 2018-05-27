import {showInfoBar} from "../actions/global/globalActions";
import {updateAuthStatusCode} from "../actions/global/authenticationActions";
import AuthStatus from "./AuthStatus";

/**
 * Default error handler
 * @param error - the error object (REQUIRED)
 * @param dispatch - the redux dispatcher (REQUIRED)
 * @param displayMsg - the global msg to display (OPTIONAL)
 * @param actions - list of actions to dispatch (OPTIONAL)
 * @param default401 - whether to turn on default status code 401 handler (OPTIONAL)
 * @param default500 - whether to turn on default status code 500 handler (OPTIONAL)
 */
export const defaultErrorHandler = (error, dispatch, displayMsg, actions = [], default401=true, default500=true) => {
    if (error.response) {
        let { response } = error;
        let { status } = response;

        switch (status) {
            case 500:
                if (default500) {
                    dispatch(showInfoBar("Server Error"));
                    return;
                } else {
                    break;
                }
            case 401:
                if (default401) {
                    dispatch(showInfoBar("Authentication Expired. Please re-login"));
                    dispatch(updateAuthStatusCode(AuthStatus.UNAUTHORIZED));
                    return;
                } else {
                    break;
                }
        }

    }
    if (displayMsg) {
        dispatch(showInfoBar(displayMsg));
    }
    actions.map(act => dispatch(act));
};