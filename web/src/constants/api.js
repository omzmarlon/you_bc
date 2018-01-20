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

// profile options
export const MAJOR_OPTIONS_API = "/api/profile/majors";
export const COURSES_OPTIONS_API = "/api/profile/courses";
export const CLASSMATES_TAGS_OPTIONS_API = "/api/profile/classmatesTags";
export const LOCATION_OPTIONS_API = "/api/profile/locations";
export const HOMETOWN_OPTIONS_API = "/api/profile/hometowns";
export const ROOMMATES_TAGS_OPTIONS_API = "/api/profile/roommatesTags";
export const FACULTIES_OPTIONS_API = "/api/profile/faculties";
export const RELATIONSHIP_OPTIONS_API = "/api/profile/relationshipStatuses";
export const FRIENDS_TAGS_API = "/api/profile/friendsTags";
// profile APIs
export const CLASSMATES_PROFILE_API = "/api/profile/classmates";
export const ROOMMATES_PROFILE_API  = "/api/profile/roommates";
export const FRIENDS_PROFILE_API = "/api/profile/friends";
export const PERSONAL_PROFILE_API = "/api/profile/user";
export const AVATAR_API = "/api/profile/avatar";
export const WECHATID_API = "/api/profile/wechatId";

// image upload
export const UPLOAD_IMAGE_API = "/api/profileStorage/image";
export const UPLOAD_IMAGE_EDIT_API = "/api/profileStorage/imageEdit";
