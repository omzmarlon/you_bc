package com.youbc.utilities;

public class EnvProperties {
    //database
    public static String DATASOURCE_URL = "youbc.db.url";
    public static String DATASOURCE_DRIVER = "youbc.db.driver";
    public static String DATASOURCE_USERNAME = "youbc.db.username";
    public static String DATASOURCE_PASSWORD = "youbc.db.password";
    public static String DATASOURCE_DIALECT = "youbc.db.dialect";

    //aws
    public static String S3_ACCESS_KEY = "s3.accessKey";
    public static String S3_SECRET_KEY = "s3.secretKey";
    public static String S3_BUCKET_NAME = "s3.bucketName";
    public static String S3_PROTOCOL = "s3.protocol";

    //security
    public static String JWT_SECRET = "jwt.secret";
    public static String JWT_EXPIRY = "jwt.expiry";

    //verification
    public static String VERIFICATION_CODE = "verification.code";
}
