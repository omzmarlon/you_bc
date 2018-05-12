package com.youbc.securities.authProviders;

import com.youbc.database.UserProfileDAO;
import com.youbc.securities.services.JWTTokenService;
import com.youbc.securities.tokens.JWTToken;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

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
            String subjectUsername = tokenService
                    .verifyToken(token)
                    .orElseThrow(() -> new AuthenticationCredentialsNotFoundException("Token does not have valid subject"));
            if (userDAO.userExistsByUsername(subjectUsername)) {
                return new UsernamePasswordAuthenticationToken(subjectUsername, null, emptyList());
            } else {
                throw new UsernameNotFoundException("User Not Found");
            }
        } catch (ExpiredJwtException | UnsupportedJwtException | MalformedJwtException | SignatureException e) {
            throw new BadCredentialsException("Invalid JWT token");
        }
    }

    public boolean supports(Class<?> authentication) {
        return JWTToken.class.isAssignableFrom(authentication);
    }

}
