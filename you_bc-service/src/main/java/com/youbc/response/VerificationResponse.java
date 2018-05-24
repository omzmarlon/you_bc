package com.youbc.response;

/**
 * Created by yifanyang on 2018-05-22.
 */
public class VerificationResponse {

    private boolean approved;

    public VerificationResponse() {
        /* for Jackson */
    }

    public VerificationResponse(boolean approved) {
        this.approved = approved;
    }

    public boolean isApproved() {
        return approved;
    }

    public void setApproved(boolean approved) {
        this.approved = approved;
    }
}
