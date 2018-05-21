package com.youbc.requests;

public class LoginRequest {
    private String username;
    private String password;

    public LoginRequest() {
        /* for jackson */
    }

    public LoginRequest(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        // TODO: logging password security issue? spring auth token protects credentials when printing
        return String.format("Username %s, password %s", username, password);
    }

}