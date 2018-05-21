package com.youbc.securities.handlers;

import com.youbc.database.UserProfileDAO;
import com.youbc.exceptions.YouBCNotFoundException;
import com.youbc.securities.services.CookieService;
import com.youbc.securities.services.JWTTokenService;
import com.youbc.securities.tokens.LoginToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final JWTTokenService tokenService;
    private final CookieService cookieService;
    private final UserProfileDAO userProfileDAO;

    @Autowired
    public LoginSuccessHandler(JWTTokenService tokenService,
                               CookieService cookieService,
                               UserProfileDAO userProfileDAO) {
        this.tokenService = tokenService;
        this.cookieService = cookieService;
        this.userProfileDAO = userProfileDAO;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication
    ) {
        String username = (String) authentication.getPrincipal();

        Integer userId = userProfileDAO.getIdByUsername(username).orElseThrow(
                () -> new YouBCNotFoundException("No user with username: "+username));

        response.addCookie(
                cookieService.createAuthCookie(
                        // principal is username from Login token
                        tokenService.generateJWTToken(userId.toString())
                ));
    }
}
