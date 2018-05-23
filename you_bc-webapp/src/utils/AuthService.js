import LocalStorage from "./LocalStorage";

export const saveAuthToken = (jwtToken) => {
    localStorage.setItem(LocalStorage.AUTH_TOKEN_STORAGE, jwtToken);
};

export const getAuthToken = () => {
    return localStorage.getItem(LocalStorage.AUTH_TOKEN_STORAGE);
};

export const removeAuthToken = () => {
    localStorage.removeItem(LocalStorage.AUTH_TOKEN_STORAGE);
};