package com.youbc.securities.tokens;

import org.springframework.security.authentication.AbstractAuthenticationToken;

public class JWTToken extends AbstractAuthenticationToken {

    private String jwtToken;

    public JWTToken(String jwtToken) {
        super(null);
        this.jwtToken = jwtToken;
    }

    @Override
    public Object getCredentials() {
        return jwtToken;
    }

    @Override
    public Object getPrincipal() {
        return jwtToken;
    }
}
