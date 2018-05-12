package com.youbc.controllers;

import com.youbc.error_handling.YouBCError;
import com.youbc.error_handling.YouBCException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
public class HealthCheckController {

    @GetMapping(path = "/health")
    public String demoJooq() {
//        return "OK";
        throw new YouBCException(
                new YouBCError(HttpStatus.BAD_REQUEST,
                        "Invalid JSON",
                        "Should provide both username and password field"
                ));
    }

}
