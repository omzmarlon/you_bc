package com.youbc.services.wechat;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.youbc.error_handling.YouBCError;
import com.youbc.error_handling.YouBCException;
import com.youbc.models.WeChatToken;
import com.youbc.models.WeChatUser;
import com.youbc.utilities.YouBCUtils;
import org.apache.http.client.fluent.Request;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.springframework.http.HttpStatus;

import java.io.IOException;

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

    public WeChatUser login(String accessGrantCode) throws IOException {
        if (YouBCUtils.isEmptyString(accessGrantCode)) {
            throw new YouBCException(new YouBCError(HttpStatus.NOT_FOUND, "access grant not found"));
        }
        WeChatToken weChatToken = getWeChatToken(accessGrantCode);
        return getWeChatUserInfo(weChatToken.getAccess_token(), weChatToken.getOpenid());
    }

    private WeChatToken getWeChatToken(String accessGrantCode) throws IOException {
        String url = String.format(
                "https://api.weixin.qq.com/sns/oauth2/access_token?appid=%s&secret=%s&code=%s&grant_type=authorization_code",
                appId,
                secret,
                accessGrantCode
        );
        WeChatToken weChatToken = mapper.readValue(Request.Get(url).execute().returnContent().asStream(), WeChatToken.class);
        if (YouBCUtils.isEmptyString(weChatToken.getErrcode())) {
            return weChatToken;
        } else {
            throw new YouBCException(new YouBCError(HttpStatus.UNAUTHORIZED, weChatToken.getErrcode()+" "+weChatToken.getErrmsg()));
        }

    }


    private WeChatUser getWeChatUserInfo(String accessToken, String openId) throws IOException {
        String url = String.format(
                "https://api.weixin.qq.com/sns/userinfo?access_token=%s&openid=%s&lang=en",
                accessToken,
                openId
        );
        WeChatUser weChatUser = mapper.readValue(Request.Get(url).execute().returnContent().asStream(), WeChatUser.class);
        if (YouBCUtils.isEmptyString(weChatUser.getErrcode())) {
            return weChatUser;
        } else {
            throw new YouBCException(new YouBCError(HttpStatus.UNAUTHORIZED, weChatUser.getErrcode()+" "+weChatUser.getErrmsg()));
        }
    }

}
