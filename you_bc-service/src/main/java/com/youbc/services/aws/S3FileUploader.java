package com.youbc.services.aws;

import java.io.File;

@FunctionalInterface
public interface S3FileUploader {
    void upload(String key, File file);
}
