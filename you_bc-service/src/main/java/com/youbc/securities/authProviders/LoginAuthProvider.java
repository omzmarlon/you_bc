package com.youbc.securities.authProviders;

import com.youbc.database.UserProfileDAO;
import com.youbc.error_handling.YouBCError;
import com.youbc.error_handling.YouBCException;
import com.youbc.securities.tokens.LoginToken;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import static java.util.Collections.emptyList;


/**
 * Provides authentication for username-password login attempt
 */
@Service
public class LoginAuthProvider implements AuthenticationProvider {

    private static final Logger LOGGER = LoggerFactory.getLogger(LoginAuthProvider.class);

    private BCryptPasswordEncoder passwordEncoder;
    private UserProfileDAO userProfileDAO;

    @Autowired
    public LoginAuthProvider(BCryptPasswordEncoder passwordEncoder, UserProfileDAO userProfileDAO) {
        this.passwordEncoder = passwordEncoder;
        this.userProfileDAO = userProfileDAO;
    }


    /**
     * Handles Authentication of {@link LoginToken} type
     */
    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        LOGGER.debug("Authenticating {}", authentication);
        String loginAttemptUsername = (String) authentication.getPrincipal();
        String loginAttemptPassword = (String) authentication.getCredentials();
        String passwordCredential = userProfileDAO
                .getPasswordCredentialByUsername(loginAttemptUsername)
                .orElseThrow(
                        () -> new YouBCException(new YouBCError(HttpStatus.NOT_FOUND, "Not Found", "User not found"))
                );
        if (passwordEncoder.matches(loginAttemptPassword, passwordCredential)) {
            LOGGER.debug("Login successful with {}", authentication);
            return new UsernamePasswordAuthenticationToken(loginAttemptUsername, null, emptyList());
        } else {
            LOGGER.debug("Login failed with {}", authentication);
            throw new YouBCException(new YouBCError(HttpStatus.UNAUTHORIZED, "Unauthorized", "Invalid email&password"));
        }
    }

    @Override
    public boolean supports(Class<?> aClass) {
        return LoginToken.class.isAssignableFrom(aClass);
    }
}
