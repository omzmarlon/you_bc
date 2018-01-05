package com.youbc.securities.services;

import javax.servlet.http.Cookie;

public class CookieService {
    private static final String AUTH_COOKIE = "Authorization";

    public Cookie createAuthCookie(String cookieValue) {
        Cookie cookie = new Cookie(AUTH_COOKIE, cookieValue);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        return cookie;
    }

    public Cookie removeAuthCookie() {
        Cookie cookie = new Cookie(AUTH_COOKIE, null);
        cookie.setHttpOnly(true);
        cookie.setMaxAge(0);
        return cookie;
    }

}
