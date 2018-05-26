package com.youbc.securities.authProviders;

import com.youbc.database.UserProfileDAO;
import com.youbc.exceptions.YouBCError;
import com.youbc.exceptions.YouBCException;
import com.youbc.exceptions.YouBCNotFoundException;
import com.youbc.exceptions.YouBCUnAuthorizedRequest;
import com.youbc.securities.services.JWTTokenService;
import com.youbc.securities.tokens.JWTToken;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import static java.util.Collections.emptyList;

/**
 * Provides authentication for requests to protected resources
 * Checks JWT token in the request
 */
@Service
public class JWTAuthProvider implements AuthenticationProvider {
    private JWTTokenService tokenService;
    private UserProfileDAO userDAO;
    @Autowired
    public JWTAuthProvider(JWTTokenService tokenService, UserProfileDAO userDAO) {
        this.tokenService = tokenService;
        this.userDAO = userDAO;
    }

    @Override
    public Authentication authenticate(Authentication authentication) {
        try {
            String token = ((String) authentication.getPrincipal());
            if (StringUtils.isEmpty(token)) {
                throw new YouBCUnAuthorizedRequest("Empty token");
            }
            Integer subjectUserId = tokenService
                    .verifyToken(token)
                    .orElseThrow(() ->
                            new YouBCUnAuthorizedRequest("Invalid token")
                    );
            if (userDAO.userExistsById(subjectUserId)) {
                return new UsernamePasswordAuthenticationToken(subjectUserId, null, emptyList());
            } else {
                throw new YouBCUnAuthorizedRequest("Authenticated User does not exists");
            }
        } catch (ExpiredJwtException | UnsupportedJwtException | MalformedJwtException | SignatureException e) {
            throw new YouBCUnAuthorizedRequest("Invalid token");
        }
    }

    public boolean supports(Class<?> authentication) {
        return JWTToken.class.isAssignableFrom(authentication);
    }

}
