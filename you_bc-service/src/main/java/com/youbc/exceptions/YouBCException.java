package com.youbc.exceptions;

public class YouBCException extends RuntimeException {

    private YouBCError youBCError;

    public YouBCException(YouBCError youBCError) {
        super(youBCError.getMessage());
        this.youBCError = youBCError;
    }

    public YouBCError getYouBCError() {
        return youBCError;
    }
}
