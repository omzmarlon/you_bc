import {UPDATE_VERIFICATION_STATUS} from "../actionTypes";
import {fetchVerificationRequest} from "../../requests/verificationRequests";
import VerificationStatus from "../../utils/VerificationStatus";

export const updateVerificationStatus = (verificationStatus) => ({type: UPDATE_VERIFICATION_STATUS, verificationStatus});

export const fetchVerificationStatus = () => dispatch => {
    fetchVerificationRequest()
        .then(
            response => {
                const { data } = response;
                if (data.approved) {
                    dispatch(updateVerificationStatus(VerificationStatus.VERIFICATION_SUCCESS));
                } else {
                    dispatch(updateVerificationStatus(VerificationStatus.UNVERIFIED));
                }
            },
            error => {
                console.log(error);
                dispatch(updateVerificationStatus(VerificationStatus.UNVERIFIED));
            }
        )
        .catch(error => {
            console.log(error);
            dispatch(updateVerificationStatus(VerificationStatus.UNVERIFIED));
        })
};