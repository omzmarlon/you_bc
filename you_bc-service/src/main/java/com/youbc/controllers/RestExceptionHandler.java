package com.youbc.controllers;

import com.youbc.error_handling.YouBCError;
import com.youbc.error_handling.YouBCException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice("com.youbc")
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

    public RestExceptionHandler() {
        super();
    }

    @ExceptionHandler({YouBCException.class})
    public ResponseEntity<YouBCError> handleYouBCException(YouBCException ex) {
        return ResponseEntity
                .status(ex.getYouBCError().getStatus())
                .body(ex.getYouBCError());
    }
}
