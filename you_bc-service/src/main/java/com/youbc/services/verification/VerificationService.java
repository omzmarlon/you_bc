package com.youbc.services.verification;

public class VerificationService {

    private String code;

    public VerificationService(String code) {
        this.code = code;
    }

    public boolean approve(String test) {
        return code.equals(test);
    }
}
