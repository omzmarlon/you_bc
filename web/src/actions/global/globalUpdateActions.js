import {UPDATE_USERNAME, UPDATE_WECHAT_ID} from "../actionTypes";

export const updateWeChatId = (weChatId) => ({type: UPDATE_WECHAT_ID, weChatId});
export const updateUsername = (username) => ({type: UPDATE_USERNAME, username});