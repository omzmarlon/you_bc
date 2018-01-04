package com.youbc.utils.aws;

import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Calendar;
import java.util.Optional;
import java.util.TimeZone;

public class S3Client {

    private String bucketName;
    private String bucketFullUrl;
    private AmazonS3 amazonS3;

    public S3Client(String s3EndpointUrl, String accessKey, String secretKey, String bucketName) {
        this.bucketName = bucketName;
        this.bucketFullUrl = "http://" + this.bucketName + "." + s3EndpointUrl;
        this.amazonS3 = new AmazonS3Client(new BasicAWSCredentials(accessKey, secretKey));
    }

    public String uploadProfileImage(MultipartFile multipartFile) throws IOException {
        return uploadMultipartFile(
                multipartFile,
                (key, file) ->
                        amazonS3.putObject(new PutObjectRequest(bucketName, key, file)
                                .withCannedAcl(CannedAccessControlList.PublicRead)),
                "profile"
        );
    }

    public String uploadMultipartFile(MultipartFile multipartFile, S3Uploader s3Uploader, String folderName) throws IOException {
        String key = folderName + "/" + generateFilename();
        File file = convertMultiPartToFile(multipartFile);
        s3Uploader.upload(key, file);
        file.delete();
        return this.bucketFullUrl + "/" + key;

    }

    private File convertMultiPartToFile(MultipartFile multipartFile) throws IOException {
        File file = new File(multipartFile.getOriginalFilename());
        FileOutputStream fos = new FileOutputStream(file);
        fos.write(multipartFile.getBytes());
        fos.close();
        return file;
    }

    private String generateFilename() {
        Calendar calendar = Calendar.getInstance();
        calendar.setTimeZone(TimeZone.getTimeZone("UTC"));
        return calendar.getTime().toString().replace(" ", "_");
    }

}
