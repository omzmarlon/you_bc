package com.youbc.securities.filters;

import com.youbc.securities.tokens.JWTToken;
import com.youbc.utilities.YouBCUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

/**
 * Filter for requests to protected API
 * Requires JWT token in request cookie
 */
public class JWTAPIFilter extends AbstractAuthenticationProcessingFilter {


    public JWTAPIFilter(String protectedUrls,
                        AuthenticationManager authenticationManager
    ) {
        super(protectedUrls);
        setAuthenticationManager(authenticationManager);
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException, IOException, ServletException {
        Map<String, String> headers = YouBCUtils.getHeaders(request);
        String jwtToken = headers.getOrDefault(HttpHeaders.AUTHORIZATION, "");

        return getAuthenticationManager().authenticate(new JWTToken(jwtToken));
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response, FilterChain chain, Authentication authResult)
            throws IOException, ServletException {
        // override default behaviour(which will redirect to /)
        SecurityContextHolder.getContext().setAuthentication(authResult);
        chain.doFilter(request, response);
    }

}
