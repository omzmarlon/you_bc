package com.youbc.exceptions;

import org.springframework.http.HttpStatus;

import javax.validation.constraints.NotNull;

public class YouBCUnAuthorizedRequest extends YouBCException {

    public YouBCUnAuthorizedRequest(@NotNull String message) {
        super(new YouBCError(HttpStatus.UNAUTHORIZED, "Unauthorized", message));
    }

}
