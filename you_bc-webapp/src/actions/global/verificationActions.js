import {UPDATE_VERIFICATION_STATUS} from "../actionTypes";

export const updateVerificationStatus = (approved) => ({type: UPDATE_VERIFICATION_STATUS, approved});