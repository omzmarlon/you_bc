package com.youbc.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class HealthCheckController {

    @GetMapping(path = "/health")
    public ResponseEntity<String> demoJooq() {
        return ResponseEntity.ok("Success");
    }

}
