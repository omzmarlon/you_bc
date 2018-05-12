package com.youbc.securities.tokens;

import org.springframework.security.authentication.AbstractAuthenticationToken;

import javax.validation.constraints.NotNull;

/**
 * The authentication information extracted from a login request
 * Such request should have username as principal and password as credential
 * All users should have empty(null) granted authority
 */
public class LoginToken extends AbstractAuthenticationToken {

    private String username;
    private String password;

    public LoginToken(@NotNull String username, @NotNull String password) {
        super(null); // no special authorities
        this.username = username;
        this.password = password;
    }


    @Override
    public Object getCredentials() {
        return this.password;
    }

    @Override
    public Object getPrincipal() {
        return this.username;
    }
}
