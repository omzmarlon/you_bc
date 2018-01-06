package com.youbc.beans;

import com.youbc.securities.services.JWTTokenService;
import com.youbc.utils.EnvProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;

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
                env.getProperty(EnvProperties.JWT_EXPIRY_SHORT, Long.class),
                env.getProperty(EnvProperties.JWT_EXPIRY_LONG, Long.class)
        );
    }

}
