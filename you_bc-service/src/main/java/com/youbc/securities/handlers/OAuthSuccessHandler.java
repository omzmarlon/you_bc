package com.youbc.securities.handlers;

import com.youbc.securities.services.CookieService;
import com.youbc.securities.services.JWTTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.LinkedHashMap;

public class OAuthSuccessHandler implements AuthenticationSuccessHandler {

    private final JWTTokenService tokenService;
    private final CookieService cookieService;


    @Autowired
    public OAuthSuccessHandler(JWTTokenService tokenService, CookieService cookieService) {
        this.tokenService = tokenService;
        this.cookieService = cookieService;
    }

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) throws IOException, ServletException {
        OAuth2Authentication oAuth2Authentication = (OAuth2Authentication) authentication;
        // TODO: casting handling
        LinkedHashMap<String, String> details = (LinkedHashMap<String, String>) oAuth2Authentication.getUserAuthentication().getDetails();
        String username = details.get("name");

        //TODO: clean up _fb
        String token = tokenService.generateJWTToken(username+"_fb");
        response.addCookie(cookieService.createAuthCookie(token));

//        response.setStatus(HttpServletResponse.SC_MOVED_PERMANENTLY);
//        response.setHeader("Location", "/");
    }
}
