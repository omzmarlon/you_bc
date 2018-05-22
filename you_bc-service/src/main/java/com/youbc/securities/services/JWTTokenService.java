package com.youbc.securities.services;

import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Date;
import java.util.Optional;

public class JWTTokenService {

    private static final Logger LOGGER = LoggerFactory.getLogger(JWTTokenService.class);
    private static final String TOKEN_PREFIX = "Bearer ";

    private String secret;
    private long expiryMillis;

    public JWTTokenService(String secret, long expiryMillis) {
        this.secret = secret;
        this.expiryMillis = expiryMillis;
    }


    /***
     * @param token - the token to verify
     * @return Some<Integer> of subject if verification successful, or None if failed
     */
    public Optional<Integer> verifyToken(String token) throws ExpiredJwtException, UnsupportedJwtException, MalformedJwtException, SignatureException {
        LOGGER.debug("Verifying token...");
        String subject = Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token.replace(TOKEN_PREFIX, ""))
                .getBody()
                .getSubject();
        return subject != null && !(subject.equals(""))? Optional.of(Integer.parseInt(subject)) : Optional.empty();
    }

    public String generateJWTToken(Integer subject) {
        return generateToken(subject, expiryMillis);
    }

    private String generateToken(Integer subject, long expiry) {
        LOGGER.debug("Generating token using subject: {}, expiry: {}", subject, expiry);
        return Jwts.builder()
                .setSubject(subject.toString())
                .setExpiration(new Date(System.currentTimeMillis()+expiry))
                .signWith(SignatureAlgorithm.HS256, secret)
                .compact();
    }

}
