package com.youbc.securities.services;

import io.jsonwebtoken.*;

import java.util.Date;
import java.util.Optional;

public class JWTTokenService {
    //private static final String TOKEN_PREFIX = "Bear ";

    private String secret;
    private long expiryMillis;

    public JWTTokenService(String secret, long expiryMillis) {
        this.secret = secret;
        this.expiryMillis = expiryMillis;
    }


    /***
     * @param token - the token to verify
     * @return Some<String> of subject if verification successful, or None if failed
     */
    public Optional<String> verifyToken(String token) throws ExpiredJwtException, UnsupportedJwtException, MalformedJwtException, SignatureException {
        String subject = Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
        return subject != null && !(subject.equals(""))? Optional.of(subject) : Optional.empty();
    }

    public String generateJWTToken(String subject) {
        return generateToken(subject, expiryMillis);
    }

    private String generateToken(String subject, long expiry) {
        return Jwts.builder()
                .setSubject(subject)
                .setExpiration(new Date(System.currentTimeMillis()+expiry))
                .signWith(SignatureAlgorithm.HS256, secret)
                .compact();
    }

}
