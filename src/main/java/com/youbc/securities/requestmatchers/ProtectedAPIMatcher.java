package com.youbc.securities.requestmatchers;

import com.youbc.utils.Endpoints;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;

@Component
public class ProtectedAPIMatcher implements RequestMatcher {
    @Override
    public boolean matches(HttpServletRequest request) {
        return new AntPathRequestMatcher(Endpoints.PROTECTED_API_PATTERN).matches(request);
    }
}
