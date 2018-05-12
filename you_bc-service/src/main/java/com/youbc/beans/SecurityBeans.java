package com.youbc.beans;

import com.youbc.securities.services.JWTTokenService;
import com.youbc.utilities.EnvProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.Ordered;
import org.springframework.core.env.Environment;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
@ComponentScan({"com.youbc"})
@PropertySource("classpath:configurations/security.properties")
public class SecurityBeans {
    private Environment env;

    @Autowired
    public SecurityBeans(Environment env) {
        this.env = env;
    }

    @Bean
    public JWTTokenService jwtTokenService() {
        return new JWTTokenService(
                env.getProperty(EnvProperties.JWT_SECRET),
                env.getProperty(EnvProperties.JWT_EXPIRY, Long.class)
        );
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
