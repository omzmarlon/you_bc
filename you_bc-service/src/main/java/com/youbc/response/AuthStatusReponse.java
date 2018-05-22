package com.youbc.response;

/**
 * Reflects user's current authentication status
 */
public class AuthStatusReponse {


    private String username;
    private String newToken;
    // more to come...

    public AuthStatusReponse(String username, String newToken) {
        this.username = username;
        this.newToken = newToken;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getNewToken() {
        return newToken;
    }

    public void setNewToken(String newToken) {
        this.newToken = newToken;
    }
}
