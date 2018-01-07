package com.youbc.error_handling;

import org.springframework.http.HttpStatus;

public class YouBCException extends RuntimeException {

    private HttpStatus httpStatus;

    public YouBCException(HttpStatus httpStatus, String msg) {
        super(msg);
        this.httpStatus = httpStatus;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }
}
