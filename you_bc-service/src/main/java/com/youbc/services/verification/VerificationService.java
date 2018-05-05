package com.youbc.services.verification;

import org.springframework.stereotype.Component;

import java.util.Random;

@Component
public class VerificationService {
    public void sendVerificationEmail(String emailAddress, String verificationCode) {
        System.out.println("verifying: "+emailAddress+" "+verificationCode);
    }

    public Integer generateVerificationCode() {
        Random rnd = new Random();
        return 100000 + rnd.nextInt(900000);
    }

}
