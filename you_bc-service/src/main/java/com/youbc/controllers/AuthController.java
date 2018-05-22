package com.youbc.controllers;

import com.youbc.database.UserProfileDAO;
import com.youbc.exceptions.YouBCNotFoundException;
import com.youbc.requests.RegistrationRequest;
import com.youbc.response.AuthStatusReponse;
import com.youbc.utilities.Endpoints;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
public class AuthController {

    private static final Logger LOGGER = LoggerFactory.getLogger(AuthController.class);

    private UserProfileDAO userDAO;
    private BCryptPasswordEncoder passwordEncoder;

    public AuthController(
            UserProfileDAO userDAO,
            BCryptPasswordEncoder passwordEncoder
    ) {
        this.userDAO = userDAO;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping(value = Endpoints.SIGNUP_ENDPOINT)
    public ResponseEntity<String> register(@RequestBody RegistrationRequest registrationRequest) {

        LOGGER.debug("Handling registration request {}", registrationRequest);

        userDAO.createNewFormLoginUser(
                registrationRequest.getUsername(),
                passwordEncoder.encode(registrationRequest.getPassword()),
                registrationRequest.getSex()
        );
        return ResponseEntity.ok("Success");
    }

    @GetMapping(value = Endpoints.AUTH_STATUS)
    public AuthStatusReponse getAuthStatus(HttpServletRequest request) {

        LOGGER.debug("Handling GET authentication status request");

        Integer userID = (Integer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = userDAO.getUsernameById(userID).orElseThrow(() -> new YouBCNotFoundException("User is not found"));

        return new AuthStatusReponse(username);
    }

}



