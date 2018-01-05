package com.youbc.securities.services;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;
import java.util.Optional;

public class JWTTokenService {
    private static final String TOKEN_PREFIX = "Bear ";

    private String secret;
    private long expiryMillis;

    public JWTTokenService(String secret, long expiryMillis) {
        this.secret = secret;
        this.expiryMillis = expiryMillis;
    }


    /***
     * @param token - the token to verify
     * @return Some<String> if verification successful, or None if failed
     */
    public Optional<String> verifyToken(String token) {
        String userID = Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token.replace(TOKEN_PREFIX, ""))
                .getBody()
                .getSubject();
        return userID != null && !(userID.equals(""))? Optional.of(userID) : Optional.empty();
    }

    /***
     * @param userID - unique ID in current application to identify a user
     * @return JWT token
     */
    public String generateToken(String userID) {
        return TOKEN_PREFIX +
                Jwts.builder()
                        .setSubject(userID)
                        .setExpiration(new Date(System.currentTimeMillis()+expiryMillis))
                        .signWith(SignatureAlgorithm.HS256, secret)
                        .compact();
    }

}
