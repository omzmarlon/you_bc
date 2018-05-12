package com.youbc.securities.filters;

import com.fasterxml.jackson.databind.JsonNode;
import com.youbc.error_handling.YouBCError;
import com.youbc.error_handling.YouBCException;
import com.youbc.securities.handlers.LoginSuccessHandler;
import com.youbc.securities.tokens.LoginToken;
import com.youbc.utilities.YouBCUtils;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Login filter for user login attempt
 */
public class UsernamePasswordLoginFilter extends AbstractAuthenticationProcessingFilter {

    private final static String LOGIN_AUTH_PARAM = "auth";

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
    ) throws AuthenticationException {
        JsonNode json = YouBCUtils.getJsonFromRequest(request);

        String username;
        String password;

        try {
            username = json.findValue("username").textValue();
            password = json.findValue("password").textValue();

            return getAuthenticationManager().authenticate(new LoginToken(username, password));

        } catch (NullPointerException e) {
            throw new AuthenticationCredentialsNotFoundException("Both username & password required", e);
        }
    }

}
