package com.youbc.securities.providers;

import com.youbc.database.UserDAO;
import com.youbc.securities.services.JWTTokenService;
import com.youbc.securities.tokens.JWTAuthenticationToken;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
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
        try {
            String token = ((String) authentication.getPrincipal());
            String subjectUserId = tokenService
                    .verifyToken(token)
                    .orElseThrow(() -> new AuthenticationCredentialsNotFoundException("Token does not have valid subject"));
            if (userDAO.userExists(subjectUserId)) {
                return new UsernamePasswordAuthenticationToken(subjectUserId, null, emptyList());
            } else {
                throw new AuthenticationCredentialsNotFoundException("User does not exists");
            }
        } catch (ExpiredJwtException | UnsupportedJwtException | MalformedJwtException | SignatureException e) {
            throw new BadCredentialsException("Invalid JWT", e);
        }
    }

    public boolean supports(Class<?> authentication) {
        return JWTAuthenticationToken.class.isAssignableFrom(authentication);
    }

}
