package com.youbc.services.aws;

import java.io.InputStream;

@FunctionalInterface
public interface S3InputStreamUploader {
    void upload(String key, InputStream inputStream);
}
