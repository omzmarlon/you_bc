package com.youbc.beans;

import com.youbc.services.wechat.WeChatOAuthService;
import com.youbc.utilities.EnvProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;

@Configuration
@ComponentScan({"com.youbc"})
@PropertySource("classpath:configurations/wechat.properties")
public class WeChatBeans {
    private Environment env;

    @Autowired
    public WeChatBeans(Environment env) {
        this.env = env;
    }

    @Bean
    public WeChatOAuthService weChatOAuthService() {
        return new WeChatOAuthService(
                env.getProperty(EnvProperties.WECHAT_APPID),
                env.getProperty(EnvProperties.WECHAT_SECRET)
        );
    }
}
