package com.youbc.securities.services;

import org.springframework.stereotype.Component;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;
import java.util.Optional;

@Component
public class CookieService {
    private static final String AUTH_COOKIE = "Authentication";

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

    public Optional<String> getAuthenticationCookie(HttpServletRequest req) {
        Cookie[] cookies = req.getCookies() == null? new Cookie[0]: req.getCookies();
        return Arrays.stream(cookies)
                .filter(c -> c.getName().equals(AUTH_COOKIE))
                .findFirst()
                .map(Cookie::getValue);
    }

}
