package com.youbc.response;

/**
 * Reflects user's current authentication status
 */
public class AuthStatusReponse {


    private String username;
    // more to come...

    public AuthStatusReponse(String username) {
        this.username = username;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
