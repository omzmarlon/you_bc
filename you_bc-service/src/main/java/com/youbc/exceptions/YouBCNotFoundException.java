package com.youbc.exceptions;

import org.springframework.http.HttpStatus;

public class YouBCNotFoundException extends YouBCException{

    public YouBCNotFoundException(String message) {
        super(new YouBCError(HttpStatus.NOT_FOUND, "Not Found", message));
    }

}
