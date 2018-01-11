import {RECEIVE_VERIFICATION, UPDATE_EMAIL, UPDATE_STUDENT_CARD, VERIFY_LOCATION} from "../actionTypes";

export const receiveVerification = (verification) => ({type: RECEIVE_VERIFICATION, verification});

export const fetchVerification = () => dispatch => {
    return Promise.resolve({
        isLocationVerified: false,
        isStudentCardVerified: false,
        studentCardUrl: '',
        isEmailVerified: false,
        email: ''
    }).then(
        response => dispatch(receiveVerification(response)),
        err => console.log('implement certain error handling')
    );
};

export const updateStudentCard = (studentCardUrl) => ({type: UPDATE_STUDENT_CARD, studentCardUrl});

export const updateEmail = (email) => ({type: UPDATE_EMAIL, email});

export const verifyLocation = () => ({type: VERIFY_LOCATION});
