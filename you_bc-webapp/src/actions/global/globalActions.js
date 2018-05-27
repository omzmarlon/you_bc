import {HIDE_GLOBAL_SPINNER, HIDE_INFO_BAR, SHOW_GLOBAL_SPINNER, SHOW_INFO_BAR} from "../actionTypes";

export const showInfoBar  = (infoBarMessage) => dispatch => {
    dispatch({type: SHOW_INFO_BAR, infoBarMessage});
    setTimeout(
        () => dispatch(hideInfoBar()),
        1500 // TODO: parameterize
    )
};
export const hideInfoBar = () => ({type: HIDE_INFO_BAR});

export const showGlobalSpinner = () => ({type: SHOW_GLOBAL_SPINNER});
export const hideGlobalSpinner = () => ({type: HIDE_GLOBAL_SPINNER});