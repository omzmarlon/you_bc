import {
    RECEIVE_VERIFICATION, SWITCH_VERIFICATION_METHOD, UPDATE_EMAIL, UPDATE_STUDENT_CARD,
    VERIFY_LOCATION
} from "../actionTypes";

export const receiveVerification = (verification) => ({type: RECEIVE_VERIFICATION, verification});

export const fetchVerification = () => dispatch => {
    return Promise.resolve({
        isLocationVerified: false,
        isStudentCardVerified: false,
        studentCardUrl: '',
        isEmailVerified: false,
        email: '',
        pending: 'none'
    }).then(
        response => dispatch(receiveVerification(response)),
        err => console.log('implement certain error handling')
    );
};

export const updateStudentCard = (studentCardUrl) => ({type: UPDATE_STUDENT_CARD, studentCardUrl});

export const updateEmail = (email) => ({type: UPDATE_EMAIL, email});

export const verifyLocation = () => ({type: VERIFY_LOCATION});

export const postVerifyLocation = () => dispatch => {
    return Promise.resolve().then(
        res => dispatch(verifyLocation()),
        err => console.log('implement certain error handling')
    );
};

export const switchVerificationMethod = (method) => ({ // one of ['location', 'email', 'card'];
    type: SWITCH_VERIFICATION_METHOD, method
});

