package com.youbc.securities.handlers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.youbc.database.UserProfileDAO;
import com.youbc.exceptions.YouBCNotFoundException;
import com.youbc.response.LoginResponse;
import com.youbc.securities.services.CookieService;
import com.youbc.securities.services.JWTTokenService;
import com.youbc.securities.tokens.LoginToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final JWTTokenService tokenService;
    private final UserProfileDAO userProfileDAO;

    private ObjectMapper mapper = new ObjectMapper();

    @Autowired
    public LoginSuccessHandler(JWTTokenService tokenService,
                               UserProfileDAO userProfileDAO) {
        this.tokenService = tokenService;
        this.userProfileDAO = userProfileDAO;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication
    ) throws IOException {
        String username = (String) authentication.getPrincipal();

        Integer userId = userProfileDAO.getIdByUsername(username).orElseThrow(
                () -> new YouBCNotFoundException("No user with username: "+username));

        String token = tokenService.generateJWTToken(userId);

        response.getWriter().write(toJson(new LoginResponse(token)));
    }

    private String toJson(Object object) throws JsonProcessingException {
        if (object == null) {
            return null;
        }
        return mapper.writeValueAsString(object);
    }

}
