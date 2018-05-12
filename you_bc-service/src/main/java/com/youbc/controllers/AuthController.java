package com.youbc.controllers;

import com.youbc.database.UserProfileDAO;
import com.youbc.requests.RegistrationRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {
    private UserProfileDAO userDAO;
    private BCryptPasswordEncoder passwordEncoder;

    public LoginController(
            UserProfileDAO userDAO,
            BCryptPasswordEncoder passwordEncoder
    ) {
        this.userDAO = userDAO;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping(value = "/register")
    public ResponseEntity<String> register(@RequestBody RegistrationRequest registrationRequest) {
        userDAO.createNewFormLoginUser(
                registrationRequest.getUsername(),
                passwordEncoder.encode(registrationRequest.getPassword()),
                registrationRequest.getSex()
        );
        return ResponseEntity.ok("Success");
    }
}



