package com.youbc.controllers.protected_api;

import com.youbc.services.aws.S3Client;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/profileStorage")
public class ProfileImageController {
    private S3Client s3Client;

    @Autowired
    public ProfileImageController(S3Client s3Client) {
        this.s3Client = s3Client;
    }

    @PostMapping("/image")
    public String uploadImage(@RequestPart(value = "image") MultipartFile file) throws IOException {
        return this.s3Client.uploadProfileImage(file);
    }

    @PostMapping("/imageEdit")
    public String uploadImageEdit(@RequestPart(value = "image") MultipartFile file) throws IOException {
        return this.s3Client.uploadProfileImageEdit(file);
    }

}
