package com.youbc.error_handling;

import org.springframework.http.HttpStatus;

public class YouBCError {

    private String message;
    private HttpStatus status;

    public YouBCError(HttpStatus status, String message) {
        this.message = message;
        this.status = status;
    }

    public int getStatus() {
        return status.value();
    }

    public void setStatus(HttpStatus status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
