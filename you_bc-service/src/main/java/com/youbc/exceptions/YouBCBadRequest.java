package com.youbc.exceptions;

import org.springframework.http.HttpStatus;

public class YouBCBadRequest extends YouBCException {

    public YouBCBadRequest(String message) {
        super(new YouBCError(HttpStatus.BAD_REQUEST, "Bad Request", message));
    }

}
