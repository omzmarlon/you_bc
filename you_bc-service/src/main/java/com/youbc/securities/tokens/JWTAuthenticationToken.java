package com.youbc.securities.tokens;

import org.springframework.security.authentication.AbstractAuthenticationToken;

import static java.util.Collections.emptyList;

public class JWTAuthenticationToken extends AbstractAuthenticationToken {
    private final String token;

    public JWTAuthenticationToken(String token) {
        super(emptyList());
        this.token = token;
    }

    @Override
    public Object getCredentials() {
        return token;
    }

    @Override public Object getPrincipal() {
        return token;
    }
}
