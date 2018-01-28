package com.youbc.services.aws;

import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Calendar;
import java.util.TimeZone;

public class S3Client {

    private String bucketName;
    private String bucketFullUrl;
    private AmazonS3 amazonS3;

    public S3Client(String accessKey, String secretKey, String bucketName, String protocol) {
        this.bucketName = bucketName;
        this.bucketFullUrl = protocol+"://" + this.bucketName;
        this.amazonS3 = new AmazonS3Client(new BasicAWSCredentials(accessKey, secretKey));
    }

    public String uploadImage(MultipartFile multipartFile,
                              String fileNamePrefix,
                              String s3Folder,
                              CannedAccessControlList accessControl
    ) throws IOException {
        return uploadMultipartFile(
                multipartFile,
                (key, file) ->
                        amazonS3.putObject(new PutObjectRequest(bucketName, key, file)
                                .withCannedAcl(accessControl)),
                fileNamePrefix,
                s3Folder
        );
    }

    public String uploadMultipartFile(MultipartFile multipartFile,
                                      S3Uploader s3Uploader,
                                      String fileNamePrefix,
                                      String folderName
    ) throws IOException {
        String key = folderName + "/" + generateFilename(fileNamePrefix);
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

    private String generateFilename(String fileNamePrefix) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTimeZone(TimeZone.getTimeZone("UTC"));
        return fileNamePrefix+"__"+calendar.getTime().toString().replace(" ", "_");
    }

}
