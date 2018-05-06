import axios from 'axios';

export const uploadImageHelper = (url, formData) => {
    return axios.post(url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
    });
};