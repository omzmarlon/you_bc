import axios from 'axios';
import {authorizedConfig, requestUrl, VERIFICATION_API} from "../constants/api";

export const getVerificationRequest = () => (
    axios.get(requestUrl(VERIFICATION_API), authorizedConfig())
);

export const postVerificationCodeRequest = (verificationCode) => (
    axios.post(requestUrl(VERIFICATION_API), {verificationCode}, authorizedConfig())
);
