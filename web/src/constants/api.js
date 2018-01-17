// Modules
export const CLASSMATES = "classmates";
export const FRIENDS = "friends";
export const ROOMMATES = "roommates";
export const PERSONAL = "personal";

// Route Paths
export const TO_CLASSMATES = "/classmates";
export const TO_FRIENDS = "/friends";
export const TO_ROOMMATES = "/roommates";
export const TO_PROFILE = "/profiles";

// APIs

export function requestUrl(api) {
    if (process.env.NODE_ENV === 'production') {
        //TODO: backend endpoint haven't set up yet
        return "http://localhost:8080" + api;
    } else {
        return "http://localhost:8080" + api;
    }
}

export const LOGIN_API = "/login";
