package com.youbc.services.wechat;

import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.youbc.services.aws.S3Client;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;
import org.apache.commons.io.FileUtils;

import java.io.File;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

@Component
@PropertySource("classpath:configurations/aws.properties")
public class WeChatService {
    @Value("${s3.profile-image-folder}")
    private String profileImageFolder;
    private S3Client s3Client;

    public WeChatService(S3Client s3Client) {
        this.s3Client = s3Client;
    }

    /***
     * migrate user profile image from wechat server to our static server for faster access
     * if any exception happens, use the original url
     * @param wechatImageUrl - url of user profile image on wechat server
     * @return new url on our server
     */
    public String migrateProfileImage(String wechatImageUrl) {
        try {
            URL url = new URL(wechatImageUrl);
            HttpURLConnection httpConn = (HttpURLConnection) url.openConnection();

            return s3Client.uploadImage(
                    httpConn.getInputStream(),
                    httpConn.getContentLengthLong(),
                    "profile",
                    profileImageFolder,
                    CannedAccessControlList.PublicRead
            );
        } catch (Exception e) {
            //TODO: make exception handling more fine-grained
            //IOException, etc
            return wechatImageUrl;
        }
    }

}
