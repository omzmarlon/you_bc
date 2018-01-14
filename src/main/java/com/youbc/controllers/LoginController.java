package com.youbc.controllers;

import com.youbc.models.WeChatUser;
import com.youbc.securities.services.JWTTokenService;
import com.youbc.services.wechat.WeChatOAuthService;
import com.youbc.utilities.Endpoints;
import com.youbc.utilities.EnvProperties;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController
@PropertySource("classpath:configurations/wechat.properties")
public class LoginController {

    @Value("${frontend.redirect}")
    private String redirectURL;
    private JWTTokenService tokenService;
    private WeChatOAuthService weChatOAuthService;

    public LoginController(JWTTokenService tokenService, WeChatOAuthService weChatOAuthService) {
        this.tokenService = tokenService;
        this.weChatOAuthService = weChatOAuthService;
    }

    @RequestMapping(value = Endpoints.WECHAT_OAUTH, method = RequestMethod.GET)
    public void wechatOAuth(HttpServletRequest request, HttpServletResponse response) throws IOException {
        System.out.println(redirectURL);
        String accessGrant = request.getParameter("code");
        WeChatUser weChatUser = weChatOAuthService.login(accessGrant);
        String loginToken = tokenService.generateShortLiveToken(weChatUser.getOpenid());
        response.sendRedirect(redirectURL+"?auth="+loginToken);
    }

    public void applicationLogin() {
        // TODO
    }

}
