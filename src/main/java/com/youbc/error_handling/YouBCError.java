package com.youbc.error_handling;

import org.springframework.http.HttpStatus;

public class YouBCError {

    private String message;
    private String errorCode;
    private HttpStatus status;

    public YouBCError(HttpStatus status, String errorCode, String message) {
        this.message = message;
        this.status = status;
        this.errorCode = errorCode;
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

    public String getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }
}
