package com.youbc.controllers.protected_api;

import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.youbc.securities.services.CookieService;
import com.youbc.services.aws.S3Client;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@RestController
public class VerificationController {
    @Value("${s3.student-card-folder}")
    private String studentCardFolder;

    private S3Client s3Client;
    private CookieService cookieService;

    @Autowired
    public VerificationController(S3Client s3Client, CookieService cookieService) {
        this.s3Client = s3Client;
        this.cookieService = cookieService;
    }

    @PostMapping("/api/verification/studentCard")
    public String uploadImageEdit(HttpServletRequest request,
                                  @RequestPart(value = "image") MultipartFile file) throws IOException {
        return this.s3Client.uploadImage(
                file,
                cookieService.getAuthenticatedUserId(request),
                studentCardFolder,
                CannedAccessControlList.Private
        );
    }

}
