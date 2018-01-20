package com.youbc.models.verification;

public class StudentVerification {
    private Boolean approved;
    private String email;
    private String emailVerificationCode;
    private Boolean studentCardUploaded;


    public StudentVerification() {}

    public StudentVerification(Boolean approved, String email, String emailVerificationCode, Boolean studentCardUploaded) {
        this.approved = approved;
        this.email = email;
        this.emailVerificationCode = emailVerificationCode;
        this.studentCardUploaded = studentCardUploaded;
    }

    public Boolean getStudentCardUploaded() {
        return studentCardUploaded;
    }

    public void setStudentCardUploaded(Boolean studentCardUploaded) {
        this.studentCardUploaded = studentCardUploaded;
    }

    public Boolean getApproved() {
        return approved;
    }

    public void setApproved(Boolean approved) {
        this.approved = approved;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEmailVerificationCode() {
        return emailVerificationCode;
    }

    public void setEmailVerificationCode(String emailVerificationCode) {
        this.emailVerificationCode = emailVerificationCode;
    }
}
