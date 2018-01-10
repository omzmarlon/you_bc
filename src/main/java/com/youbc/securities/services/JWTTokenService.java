package com.youbc.securities.services;

import io.jsonwebtoken.*;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.Optional;

public class JWTTokenService {
    private static final String TOKEN_PREFIX = "Bear ";

    private String secret;
    private long shortExpiryMillis;
    private long longExpiryMillis;

    public JWTTokenService(String secret, long shortExpiryMillis, long longExpiryMillis) {
        this.secret = secret;
        this.shortExpiryMillis = shortExpiryMillis;
        this.longExpiryMillis = longExpiryMillis;
    }


    /***
     * @param token - the token to verify
     * @return Some<String> of subject if verification successful, or None if failed
     */
    public Optional<String> verifyToken(String token) throws ExpiredJwtException, UnsupportedJwtException, MalformedJwtException, SignatureException {
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
    public String generateShortLiveToken(String userID) {
        return generateToken(userID, shortExpiryMillis);
    }

    public String generateLongLiveToken(String userID) {
        return generateToken(userID, longExpiryMillis);
    }

    private String generateToken(String userID, long expiry) {
        return TOKEN_PREFIX +
                Jwts.builder()
                        .setSubject(userID)
                        .setExpiration(new Date(System.currentTimeMillis()+expiry))
                        .signWith(SignatureAlgorithm.HS256, secret)
                        .compact();
    }

}
