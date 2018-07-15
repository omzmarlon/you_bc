package com.youbc.configs;

import com.youbc.services.verification.VerificationService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan({"com.youbc"})
public class VerificationConfigs {

    @Value("${verification.code}")
    private String verificationCode;

    @Bean
    public VerificationService verificationService() {
        return new VerificationService(verificationCode);
    }
}


