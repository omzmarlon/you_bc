package com.youbc.requests;

/**
 * Created by yifanyang on 2018-05-22.
 */
public class VerificationRequest {

    private String verificationCode;

    public VerificationRequest() {
        /* for Jackson */
    }

    public VerificationRequest(String verificationCode) {
        this.verificationCode = verificationCode;
    }


    public String getVerificationCode() {
        return verificationCode;
    }

    public void setVerificationCode(String verificationCode) {
        this.verificationCode = verificationCode;
    }

    @Override
    public String toString() {
        return String.format("provided code: %s", verificationCode);
    }
}
