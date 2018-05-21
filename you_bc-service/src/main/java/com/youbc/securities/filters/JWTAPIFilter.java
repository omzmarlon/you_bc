package com.youbc.securities.filters;

import com.youbc.exceptions.YouBCError;
import com.youbc.exceptions.YouBCException;
import com.youbc.securities.services.CookieService;
import com.youbc.securities.tokens.JWTToken;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Filter for requests to protected API
 * Requires JWT token in request cookie
 */
public class JWTAPIFilter extends AbstractAuthenticationProcessingFilter {

    private CookieService cookieService;

    public JWTAPIFilter(String protectedUrls,
                        AuthenticationManager authenticationManager,
                        CookieService cookieService
    ) {
        super(protectedUrls);
        setAuthenticationManager(authenticationManager);
        this.cookieService = cookieService;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException, IOException, ServletException {
        String jwtToken = cookieService
                .getAuthenticationCookie(request)
                .orElseThrow(() -> new YouBCException(
                        new YouBCError(HttpStatus.UNAUTHORIZED, "Unauthorized", "Invalid cookie")
                ));
        return getAuthenticationManager().authenticate(new JWTToken(jwtToken));
    }
}
