package com.youbc.securities.filters;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.youbc.exceptions.YouBCError;
import com.youbc.exceptions.YouBCException;
import com.youbc.requests.LoginRequest;
import com.youbc.securities.handlers.LoginSuccessHandler;
import com.youbc.securities.tokens.LoginToken;
import com.youbc.utilities.YouBCUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Login filter for user login attempt
 */
public class UsernamePasswordLoginFilter extends AbstractAuthenticationProcessingFilter {

    private static final Logger LOGGER = LoggerFactory.getLogger(UsernamePasswordLoginFilter.class);

    public UsernamePasswordLoginFilter(
            String filterUrl,
            AuthenticationManager authenticationManager,
            LoginSuccessHandler successHandler
    ) {
        super(filterUrl);
        setAuthenticationManager(authenticationManager);
        setAuthenticationSuccessHandler(successHandler);
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request,
                                                HttpServletResponse response
    ) throws IOException {
        try {
            LoginRequest loginRequest = YouBCUtils.parseJson(request, LoginRequest.class);

            LOGGER.debug("Handling Login request: {}", loginRequest);

            return getAuthenticationManager().authenticate(
                    new LoginToken(loginRequest.getUsername(), loginRequest.getPassword())
            );
        } catch (JsonProcessingException ex) {
            throw new YouBCException(new YouBCError(HttpStatus.BAD_REQUEST, "Bad Request", "Invalid login JSON"));
        }
    }

}
