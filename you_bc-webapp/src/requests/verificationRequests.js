import axios from 'axios';
import {authorizedConfig, requestUrl, VERIFICATION_API} from "../constants/api";

export const fetchVerificationRequest = () => (
    axios.get(requestUrl(VERIFICATION_API), authorizedConfig())
);

export const submitVerificationCode = (verificationCode) => (
    //axios.post(requestUrl(VERIFICATION_API), {verificationCode}, authorizedConfig())
    Promise.resolve()
);
