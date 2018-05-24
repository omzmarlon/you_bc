package com.youbc.controllers.protected_api;

import com.youbc.database.VerificationDAO;
import com.youbc.exceptions.YouBCError;
import com.youbc.exceptions.YouBCException;
import com.youbc.models.verification.StudentVerification;
import com.youbc.requests.VerificationRequest;
import com.youbc.response.VerificationResponse;
import com.youbc.services.aws.S3Client;
import com.youbc.services.verification.VerificationService;
import com.youbc.utilities.Endpoints;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@RestController
public class VerificationController {

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
        Integer userID = (Integer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        boolean codeMatch = verificationService.approve(request.getVerificationCode());
        if (codeMatch) {
            // todo: db exception handling
            verificationDAO.persistVerificationStatus(userID);
            VerificationResponse verificationResponse = new VerificationResponse();
            verificationResponse.setApproved(true);
            return verificationResponse;
        } else {
            // throw wrong code exception
        }
    }

    @GetMapping( value = Endpoints.VERIFICATION )
    public VerificationResponse getVerificationResult() {
        Integer userID = (Integer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        // todo: db exception handling
        boolean approved = verificationDAO.fetchVerificationStatus(userID);
        VerificationResponse verificationResponse = new VerificationResponse();
        verificationResponse.setApproved(approved);
        return verificationResponse;
    }

//
//
//
//    @GetMapping("/api/verification/info")
//    public StudentVerification getVerificationInfo(HttpServletRequest request) {
//        return this
//                .verificationDAO
//                .fetchStudentVerification(
//                        (Integer) SecurityContextHolder.getContext().getAuthentication().getPrincipal()
//                );
//    }
//
//    @PostMapping(value = {"/api/verification/code", "/api/verification/location"})
//    public StudentVerification verifyLocation(HttpServletRequest request) {
//        Integer userId = (Integer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        verificationDAO.approve(userId);
//        return this.verificationDAO.fetchStudentVerification(userId);
//    }
//
//    @PostMapping("/api/verification/studentCard")
//    public StudentVerification uploadStudentCard(HttpServletRequest request,
//                                                 @RequestPart(value = "image") MultipartFile file) throws IOException {
//        Integer userId = (Integer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        String studentCardUrl =  this.s3Client.uploadImage(
//                file,
//                ((Integer) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).toString(),
//                studentCardFolder,
//                CannedAccessControlList.Private
//        );
//        verificationDAO.persistStudentCardVerification(userId, studentCardUrl);
//        return this.verificationDAO.fetchStudentVerification(userId);
//    }
//
//    @RequestMapping(path = "/api/verification/email", method = RequestMethod.POST, consumes = "text/plain")
//    public StudentVerification postEmail(HttpServletRequest request, @RequestBody String email) {
//        Integer userId = (Integer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        // make sure email sending successful before persisting email and code to db
//        String verificationCode = verificationService.generateVerificationCode().toString();
//        verificationService.sendVerificationEmail(email, verificationCode);
//        verificationDAO.persistEmailVerification(userId, email, verificationCode);
//        return this.verificationDAO.fetchStudentVerification(userId);
//    }
//
//    @RequestMapping(path = "/api/verification/emailCode", method = RequestMethod.POST, consumes = "text/plain")
//    public StudentVerification verifyEmailCode(HttpServletRequest request, @RequestBody String emailCode) {
//        Integer userId = (Integer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        String verificationCode = verificationDAO
//                .fetchEmailVerificationCode(userId)
//                .orElseThrow(() -> new YouBCException(new YouBCError(HttpStatus.BAD_REQUEST, "Email Code Not Exist", "Email Code Not Exist")));
//        //TODO refactor verification logic into VerificationService
//        if (verificationCode.equals(emailCode)) {
//            verificationDAO.approve(userId);
//            return verificationDAO.fetchStudentVerification(userId);
//        } else {
//            throw new YouBCException(new YouBCError(HttpStatus.BAD_REQUEST, "Invalid Code", "Invalid Code"));
//        }
//    }

}
