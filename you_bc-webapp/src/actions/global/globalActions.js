import {HIDE_INFO_BAR, SHOW_INFO_BAR} from "../actionTypes";

export const showInfoBar  = (infoBarMessage) => dispatch => {
    dispatch({type: SHOW_INFO_BAR, infoBarMessage});
    setTimeout(
        () => dispatch(hideInfoBar()),
        1500
    )
};
export const hideInfoBar = () => ({type: HIDE_INFO_BAR});