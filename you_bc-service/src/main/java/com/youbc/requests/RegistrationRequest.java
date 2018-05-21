package com.youbc.requests;

public class RegistrationRequest {

    private String username;
    private String password;
    private String sex;

    public RegistrationRequest() {/* For Jackson */}

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

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }


    @Override
    public String toString() {
        // TODO: logging password security issue? spring auth token protects credentials when printing
        return String.format("Username: %s, Password: %s, Sex: %s", username, password, sex);
    }
}
