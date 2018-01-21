import {
    RECEIVE_VERIFICATION, SWITCH_VERIFICATION_METHOD, UPDATE_EMAIL, UPDATE_STUDENT_CARD,
    VERIFY_LOCATION
} from "../actionTypes";

import axios from 'axios';
import {requestUrl, VERIFICATION_INFO_API} from "../../constants/api";
import {showInfoBar} from "./globalActions";

export const receiveVerification = (verification) => ({type: RECEIVE_VERIFICATION, verification});

export const fetchVerification = () => dispatch => {
    axios.get(requestUrl(VERIFICATION_INFO_API), {withCredentials: true})
        .then(
            response => {
                const approved = response.data.approved;
                const email = response.data.email;
                const studentCardUploaded = response.data.studentCardUploaded;
                let pending = 'none';
                if (studentCardUploaded) {
                    pending = 'card'
                } else if (email) {
                    pending = 'email'
                }
                dispatch(receiveVerification({
                    isLocationVerified: approved,
                    isStudentCardVerified: approved,
                    isEmailVerified: approved,
                    email: email?email:'',
                    pending: pending
                }));
            },
            err => {
                // TODO: centralize error handling
                dispatch(showInfoBar("获取学生认证信息失败"));
                if (err.response.data.error) {
                    console.log(err.response.data.error);
                }
            }
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

