package com.youbc.services.wechat;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.youbc.models.WeChatToken;
import com.youbc.models.WeChatUser;
import org.apache.http.client.fluent.Request;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class WeChatOAuthService {

    private String appId;
    private String secret;
    private CloseableHttpClient httpClient;
    private ObjectMapper mapper;

    public WeChatOAuthService(String appId, String secret) {
        this.httpClient = HttpClients.createDefault();
        this.mapper = new ObjectMapper();
        this.appId = appId;
        this.secret = secret;
    }

    public WeChatUser login(String accessGrantCode) {
        return null;
    }

    public WeChatToken getWeChatToken(String accessGrantCode) throws IOException {
        String url = "http://targethost/homepage";
        WeChatToken weChatToken = mapper.readValue(Request.Get(url).execute().returnContent().asStream(), WeChatToken.class);
        return weChatToken;
    }


    public WeChatUser getWeChatUserInfo(String accessToken) {
        return null;
    }

}
