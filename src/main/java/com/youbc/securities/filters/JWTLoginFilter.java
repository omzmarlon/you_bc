package com.youbc.securities.filters;

import com.amazonaws.services.directory.model.AuthenticationFailedException;
import com.youbc.securities.handlers.LoginSuccessHandler;
import com.youbc.securities.requestmatchers.LoginRequestMatcher;
import com.youbc.securities.tokens.JWTAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JWTLoginFilter extends AbstractAuthenticationProcessingFilter {

    private final static String LOGIN_AUTH_PARAM = "auth";

    public JWTLoginFilter(
            LoginRequestMatcher requestMatcher,
            AuthenticationManager authenticationManager,
            LoginSuccessHandler successHandler
    ) {
        super(requestMatcher);
        setAuthenticationManager(authenticationManager);
        setAuthenticationSuccessHandler(successHandler);
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException, IOException, ServletException {
        String jwtToken = request.getParameter(LOGIN_AUTH_PARAM);
        if (jwtToken == null || jwtToken.equals("")) {
            throw new AuthenticationFailedException("Authentication token not found");
        }
        return getAuthenticationManager().authenticate(new JWTAuthenticationToken(jwtToken));
    }
}
