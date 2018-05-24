const AuthStatus = {
    AUTH_SUCCESS: 200,
    UNAUTHORIZED: 401,
    UNKNOWN: -1
};

if (Object.freeze) {
    Object.freeze(AuthStatus);
}

export default AuthStatus;