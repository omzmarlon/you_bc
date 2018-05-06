package com.youbc.securities.filters;

import com.youbc.securities.requestmatchers.ProtectedAPIMatcher;
import com.youbc.securities.services.CookieService;
import com.youbc.securities.tokens.JWTAuthenticationToken;
import com.youbc.utilities.Endpoints;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
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

/***
 * A security filter first acquires token from cookie in the request for authentication provider to authenticate
 */
public class JWTAPIFilter extends AbstractAuthenticationProcessingFilter {

    private CookieService cookieService;

    public JWTAPIFilter(ProtectedAPIMatcher requestMatcher,
                        AuthenticationManager authenticationManager,
                        CookieService cookieService
    ) {
        //TODO: should be super(requestMatcher); but not sure why it always gives status 302. super("/"); works for now
        //super(requestMatcher);
        super("/s");
        setAuthenticationManager(authenticationManager);
        this.cookieService = cookieService;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException, IOException, ServletException {
        String jwtToken = cookieService
                .getAuthenticationCookie(request)
                .orElseThrow(() -> new AuthenticationCredentialsNotFoundException("Auth cookie not found"));
        return getAuthenticationManager().authenticate(new JWTAuthenticationToken(jwtToken));
    }

    @Override
    public void successfulAuthentication(HttpServletRequest request,
                                         HttpServletResponse response,
                                         FilterChain filterChain,
                                         Authentication authResult)
            throws IOException, ServletException {
        //SecurityContextHolder.getContext().setAuthentication(authResult);
        super.successfulAuthentication(request, response, filterChain, authResult);
        filterChain.doFilter(request, response);
    }
}
