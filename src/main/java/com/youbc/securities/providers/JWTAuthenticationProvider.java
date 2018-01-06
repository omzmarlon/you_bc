package com.youbc.securities.providers;

import com.amazonaws.services.directory.model.AuthenticationFailedException;
import com.youbc.database.UserDAO;
import com.youbc.securities.services.JWTTokenService;
import com.youbc.securities.tokens.JWTAuthenticationToken;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

import static java.util.Collections.emptyList;

/***
 * AuthenticationProvider provides details on how to authenticate
 * This provider will authenticate any requests to protected APIs.
 * This AuthenticationProvider authenticates by calling tokenService to verify token validity
 */
@Component
public class JWTAuthenticationProvider implements AuthenticationProvider {
    private JWTTokenService tokenService;
    private UserDAO userDAO;
    @Autowired
    public JWTAuthenticationProvider(JWTTokenService tokenService, UserDAO userDAO) {
        this.tokenService = tokenService;
        this.userDAO = userDAO;
    }

    public Authentication authenticate(Authentication authentication) {
        String token = ((String) authentication.getPrincipal());
        String subjectUserId = tokenService
                .verifyToken(token)
                .orElseThrow(() -> new AuthenticationFailedException("JWT Auth Provider Could not find subject"));
        if (userDAO.userExists(subjectUserId)) {
            return new UsernamePasswordAuthenticationToken(subjectUserId, null, emptyList());
        } else {
            throw new AuthenticationFailedException("JWT Auth Provider user does not exists");
        }
    }

    public boolean supports(Class<?> authentication) {
        return JWTAuthenticationToken.class.isAssignableFrom(authentication);
    }

}
