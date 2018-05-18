// Modules
export const CLASSMATES = "classmates";
export const FRIENDS = "friends";
export const ROOMMATES = "roommates";
export const PERSONAL = "personal";

// Route Paths
export const TO_CLASSMATES = "/ca/classmates";
export const TO_FRIENDS = "/ca/friends";
export const TO_ROOMMATES = "/ca/roommates";
export const TO_PROFILE = "/ca/profiles";
export const LOGIN = "/ca/login";
export const REGISTER = "/ca/register";

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
export const REGISTER_API = "/register";

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
export const MATCHED_USERS_API = "/api/profile/matchedUsers";

// image upload
export const UPLOAD_IMAGE_API = "/api/profileStorage/image";
export const UPLOAD_IMAGE_EDIT_API = "/api/profileStorage/imageEdit";


//Verification API
export const VERIFICATION_INFO_API = "/api/verification/info";
export const LOCATION_VERIFICATION_API = "/api/verification/location";
export const STUDENT_CARD_VERIFICATION_API = "/api/verification/studentCard";
export const EMAIL_VERIFICATION_API = "/api/verification/email";
export const VERIFY_EMAIL_CODE_API = "/api/verification/emailCode";
export const CODE_VERIFICATION_API = "/api/verification/code";

// mainList API
export const FETCH_CLASSMATES_API = "/api/classmates";
export const FETCH_FRIENDS_API = "/api/friends";
export const FETCH_ROOMMATES_API = "/api/roommates";
export const LIKE_CLASSMATES_API = userId => `/api/classmates/${userId}/likes`;
export const DISLIKE_CLASSMATES_API = userId => `/api/classmates/${userId}/dislikes`;
export const LIKE_FRIENDS_API = userId => `/api/friends/${userId}/likes`;
export const DISLIKE_FRIENDS_API = userId => `/api/friends/${userId}/dislikes`;
export const LIKE_ROOMMATES_API = userId => `/api/roommates/${userId}/likes`;
export const DISLIKE_ROOMMATES_API = userId => `/api/roommates/${userId}/dislikes`;