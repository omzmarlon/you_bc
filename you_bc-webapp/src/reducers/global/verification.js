import {
    RECEIVE_VERIFICATION, SWITCH_VERIFICATION_METHOD, UPDATE_EMAIL, UPDATE_STUDENT_CARD, VERIFY_CODE,
    VERIFY_LOCATION
} from "../../actions/actionTypes";

const initial = {
    // TODO: do we need so many booleans?
    isLocationVerified: false,
    isStudentCardVerified: false,
    studentCardUrl: '', // TODO: not needed if we don't want to display student card in frontend
    isEmailVerified: false,
    isCodeVerified: false,
    email: '',
    pending: 'none', // one of ['none', 'email', 'card']; so that we know what the status is
    using: 'location', // one of ['location', 'email', 'card']; so that we know which verification method to use
};

const verification = (state = initial, action) => {
    switch (action.type) {
        case RECEIVE_VERIFICATION:
            return {...state, ...action.verification};
        case UPDATE_STUDENT_CARD:
            return {...state, ...action.studentCardUrl};
        case UPDATE_EMAIL:
            return {...state, ...action.email};
        case VERIFY_LOCATION:
            return {...state, isLocationVerified: true};
        case VERIFY_CODE:
            return {...state, isCodeVerified: true};
        case SWITCH_VERIFICATION_METHOD:
            return {...state, using: action.method};
        default:
            return state;
    }
};

export default verification;
