package com.youbc.controllers;

import org.springframework.web.bind.annotation.*;

@RestController
public class HealthCheckController {

    @GetMapping(path = "/health")
    public String demoJooq() {
        return "OK";
    }

}
