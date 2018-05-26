import axios from 'axios';
import {authorizationHeader} from "../../constants/api";

export const uploadImageHelper = (url, formData) => {
    return axios.post(url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            ...authorizationHeader()
        }
    });
};