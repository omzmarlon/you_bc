package com.youbc.utilities;

public class Endpoints {
    public final static String LOGIN_ENDPOINT = "/login";
    public final static String SIGNUP_ENDPOINT = "/register";
    public final static String HEALTH_ENDPOINT = "/health";
    public final static String WECHAT_OAUTH = "/wechat_oauth";
    // Protected routes
    public final static String PROTECTED_API_PATTERN = "/api/**";
    public final static String CLASSMATE_CANDIDATES = "/api/classmates";
    public final static String FRIEND_CANDIDATES = "/api/friends";
    public final static String ROOMMATE_CANDIDATES = "/api/roommates";
    public final static String LIKE_CLASSMATES = "/api/classmates/{user_id}/likes";
    public final static String DISLIKE_CLASSMATES = "/api/classmates/{user_id}/dislikes";
    public final static String LIKE_FRIENDS = "/api/friends/{user_id}/likes";
    public final static String DISLIKE_FRIENDS = "/api/friends/{user_id}/dislikes";
    public final static String LIKE_ROOMMATES = "/api/roommates/{user_id}/likes";
    public final static String DISLIKE_ROOMMATES = "/api/roommates/{user_id}/dislikes";
    public final static String MATCHED_USERS = "/api/profile/matchedUsers";
    public final static String AUTH_STATUS = "/api/auth_status";
}
