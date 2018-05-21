package com.youbc.controllers.protected_api;

import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.youbc.database.VerificationDAO;
import com.youbc.exceptions.YouBCError;
import com.youbc.exceptions.YouBCException;
import com.youbc.models.verification.StudentVerification;
import com.youbc.securities.services.CookieService;
import com.youbc.services.aws.S3Client;
import com.youbc.services.verification.VerificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@RestController
public class VerificationController {
    @Value("${s3.student-card-folder}")
    private String studentCardFolder;

    private S3Client s3Client;
    private CookieService cookieService;
    private VerificationDAO verificationDAO;
    private VerificationService verificationService;

    @Autowired
    public VerificationController(
            S3Client s3Client,
            CookieService cookieService,
            VerificationDAO verificationDAO,
            VerificationService verificationService
    ) {
        this.s3Client = s3Client;
        this.cookieService = cookieService;
        this.verificationDAO = verificationDAO;
        this.verificationService = verificationService;
    }

    @GetMapping("/api/verification/info")
    public StudentVerification getVerificationInfo(HttpServletRequest request) {
        return this
                .verificationDAO
                .fetchStudentVerification(
                        cookieService.getAuthenticatedUserId(request)
                );
    }

    @PostMapping(value = {"/api/verification/code", "/api/verification/location"})
    public StudentVerification verifyLocation(HttpServletRequest request) {
        Integer userId = cookieService.getAuthenticatedUserId(request);
        verificationDAO.approve(userId);
        return this.verificationDAO.fetchStudentVerification(userId);
    }

    @PostMapping("/api/verification/studentCard")
    public StudentVerification uploadStudentCard(HttpServletRequest request,
                                                 @RequestPart(value = "image") MultipartFile file) throws IOException {
        Integer userId = cookieService.getAuthenticatedUserId(request);
        String studentCardUrl =  this.s3Client.uploadImage(
                file,
                cookieService.getAuthenticatedUserId(request).toString(),
                studentCardFolder,
                CannedAccessControlList.Private
        );
        verificationDAO.persistStudentCardVerification(userId, studentCardUrl);
        return this.verificationDAO.fetchStudentVerification(userId);
    }

    @RequestMapping(path = "/api/verification/email", method = RequestMethod.POST, consumes = "text/plain")
    public StudentVerification postEmail(HttpServletRequest request, @RequestBody String email) {
        Integer userId = cookieService.getAuthenticatedUserId(request);
        // make sure email sending successful before persisting email and code to db
        String verificationCode = verificationService.generateVerificationCode().toString();
        verificationService.sendVerificationEmail(email, verificationCode);
        verificationDAO.persistEmailVerification(userId, email, verificationCode);
        return this.verificationDAO.fetchStudentVerification(userId);
    }

    @RequestMapping(path = "/api/verification/emailCode", method = RequestMethod.POST, consumes = "text/plain")
    public StudentVerification verifyEmailCode(HttpServletRequest request, @RequestBody String emailCode) {
        Integer userId = cookieService.getAuthenticatedUserId(request);
        String verificationCode = verificationDAO
                .fetchEmailVerificationCode(userId)
                .orElseThrow(() -> new YouBCException(new YouBCError(HttpStatus.BAD_REQUEST, "Email Code Not Exist", "Email Code Not Exist")));
        //TODO refactor verification logic into VerificationService
        if (verificationCode.equals(emailCode)) {
            verificationDAO.approve(userId);
            return verificationDAO.fetchStudentVerification(userId);
        } else {
            throw new YouBCException(new YouBCError(HttpStatus.BAD_REQUEST, "Invalid Code", "Invalid Code"));
        }
    }

}
