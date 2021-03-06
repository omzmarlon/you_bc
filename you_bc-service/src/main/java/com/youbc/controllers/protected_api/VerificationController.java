package com.youbc.controllers.protected_api;

import com.youbc.database.VerificationDAO;
import com.youbc.exceptions.YouBCBadRequest;
import com.youbc.requests.VerificationRequest;
import com.youbc.response.VerificationResponse;
import com.youbc.services.verification.VerificationService;
import com.youbc.utilities.Endpoints;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class VerificationController {

    private static final Logger LOGGER = LoggerFactory.getLogger(VerificationController.class);

    private VerificationDAO verificationDAO;
    private VerificationService verificationService;

    @Autowired
    public VerificationController(
            VerificationDAO verificationDAO,
            VerificationService verificationService
    ) {
        this.verificationDAO = verificationDAO;
        this.verificationService = verificationService;
    }

    @PostMapping( value = Endpoints.VERIFICATION )
    public VerificationResponse verifiyCode(@RequestBody VerificationRequest request) {

        LOGGER.debug("Handle Verification request: {}", request);

        Integer userID = (Integer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        boolean codeMatch = verificationService.approve(request.getVerificationCode());
        if (codeMatch) {
            verificationDAO.persistVerificationStatus(userID);
            VerificationResponse verificationResponse = new VerificationResponse();
            verificationResponse.setApproved(true);
            return verificationResponse;
        } else {
            throw new YouBCBadRequest("Incorrect Verification Code.");
        }
    }

    @GetMapping( value = Endpoints.VERIFICATION )
    public VerificationResponse getVerificationResult() {

        LOGGER.debug("Get Verification Status request");

        Integer userID = (Integer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        boolean approved = verificationDAO.fetchVerificationStatus(userID);
        VerificationResponse verificationResponse = new VerificationResponse();
        verificationResponse.setApproved(approved);
        return verificationResponse;
    }

}
