package com.youbc.securities.requestmatchers;

import com.youbc.utilities.Endpoints;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;

@Component
public class LoginRequestMatcher implements RequestMatcher {

    @Override
    public boolean matches(HttpServletRequest request) {
        return new AntPathRequestMatcher(Endpoints.LOGIN_ENDPOINT).matches(request);
    }
}
