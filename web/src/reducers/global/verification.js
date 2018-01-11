import {RECEIVE_VERIFICATION, UPDATE_EMAIL, UPDATE_STUDENT_CARD, VERIFY_LOCATION} from "../../actions/actionTypes";

const initial = {
    isLocationVerified: false,
    isStudentCardVerified: false,
    studentCardUrl: '',
    isEmailVerified: false,
    email: ''
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
        default:
            return state;
    }
};

export default verification;
