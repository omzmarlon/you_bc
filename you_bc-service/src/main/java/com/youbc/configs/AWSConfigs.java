package com.youbc.configs;

import com.youbc.services.aws.S3Client;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan({"com.youbc"})
public class AWSConfigs {
    @Value("${s3.accessKey}")
    private String s3AccessKey;

    @Value("${s3.secretKey}")
    private String s3SecretKey;

    @Value("${s3.bucketName}")
    private String s3BucketName;

    @Value("${s3.protocol}")
    private String s3Protocol;

    @Bean
    public S3Client s3Client() {
        return new S3Client(s3AccessKey, s3SecretKey, s3BucketName, s3Protocol);
    }
}
