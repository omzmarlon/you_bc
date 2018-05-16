package com.youbc.beans;

import com.youbc.securities.handlers.OAuthFailureHandler;
import com.youbc.securities.handlers.OAuthSuccessHandler;
import com.youbc.securities.services.CookieService;
import com.youbc.securities.services.JWTTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.oauth2.resource.ResourceServerProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.security.oauth2.client.filter.OAuth2ClientContextFilter;
import org.springframework.security.oauth2.client.token.grant.code.AuthorizationCodeResourceDetails;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableOAuth2Client;
import org.springframework.stereotype.Component;

@EnableOAuth2Client
@Configuration
@PropertySource("classpath:configurations/oauth.properties")
@Component
public class OAuth2Config {
    @Bean
    @ConfigurationProperties("facebook.client")
    public AuthorizationCodeResourceDetails facebook() {
        return new AuthorizationCodeResourceDetails();
    }

    @Bean(name = "facebookResource")
    @ConfigurationProperties("facebook.resource")
    public ResourceServerProperties facebookResource() {
        return new ResourceServerProperties();
    }

    @Bean
    public FilterRegistrationBean oauth2ClientFilterRegistration(OAuth2ClientContextFilter filter) {
        FilterRegistrationBean registration = new FilterRegistrationBean();
        registration.setFilter(filter);
        registration.setOrder(-100);
        return registration;
    }

    @Bean
    @Autowired
    public OAuthSuccessHandler oAuthSuccessHandler(JWTTokenService tokenService, CookieService cookieService) {
        return new OAuthSuccessHandler(tokenService, cookieService);
    }

    @Bean
    public OAuthFailureHandler oAuthFailureHandler() {
        return new OAuthFailureHandler();
    }

}
