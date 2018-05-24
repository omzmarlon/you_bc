import {UPDATE_VERIFICATION_STATUS} from "../../actions/actionTypes";
import VerificationStatus from "../../utils/VerificationStatus";

const initial = {
    verificationStatus: VerificationStatus.UNKNOWN
};

const verification = (state = initial, action) => {
    switch (action.type) {
        case UPDATE_VERIFICATION_STATUS:
            return {...state, verificationStatus: action.verificationStatus};
        default:
            return state;
    }
};

export default verification;
