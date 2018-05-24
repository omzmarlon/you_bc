package com.youbc.beans;

import com.youbc.services.verification.VerificationService;
import com.youbc.utilities.EnvProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;

@Configuration
@ComponentScan({"com.youbc"})
@PropertySource("classpath:configurations/verification.properties")
public class VerificationBeans {
    private Environment env;

    @Autowired
    public VerificationBeans(Environment env) {
        this.env = env;
    }

    @Bean
    public VerificationService verificationService() {
        return new VerificationService(env.getProperty(EnvProperties.VERIFICATION_CODE));
    }
}


