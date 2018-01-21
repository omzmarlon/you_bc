package com.youbc.controllers.protected_api;

import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.youbc.services.aws.S3Client;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/profileStorage")
@PropertySource("classpath:configurations/aws.properties")
public class ProfileImageController {
    @Value("${s3.profile-image-folder}")
    private String profileImageFolder;
    @Value("${s3.profile-image-edit-folder}")
    private String profileImageEditFolder;

    private S3Client s3Client;

    @Autowired
    public ProfileImageController(S3Client s3Client) {
        this.s3Client = s3Client;
    }

    @PostMapping("/image")
    public String uploadImage(@RequestPart(value = "image") MultipartFile file) throws IOException {
        return this.s3Client.uploadImage(file, "profile", profileImageFolder, CannedAccessControlList.PublicRead);
    }

    @PostMapping("/imageEdit")
    public String uploadImageEdit(@RequestPart(value = "image") MultipartFile file) throws IOException {
        return this.s3Client.uploadImage(file, "profileEdit", profileImageEditFolder, CannedAccessControlList.PublicRead);
    }

}
