package com.stockbroker.stockapp.service;


import java.util.Date;
import org.springframework.stereotype.Service;

import com.stockbroker.stockapp.model.User;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import javax.crypto.spec.SecretKeySpec;
import java.security.Key;

//This JWTServices class is a utility in our spring boot backend that generates and
//validates JWT(JSON Web Tokens) for authentication. its commonly used in login systems
// to securely manage user sessions without using traditional server-side sessions


// Generates JWT tokens for Login
@Service
public class JWTService {
	
	// we can keep this secret somewhere safe
	private static final String SECRET_KEY = "Trading.and.Investing.2025.08.07.abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=~`";
	private static final long EXPIRATION_TIME = 86400000; // 24hours

    private Key getSigningKey() {
        // Use only the first 64 bytes for HS512 (512 bits)
        byte[] keyBytes = SECRET_KEY.getBytes();
        if (keyBytes.length < 64) {
            // Pad the key if it's too short
            byte[] padded = new byte[64];
            System.arraycopy(keyBytes, 0, padded, 0, keyBytes.length);
            for (int i = keyBytes.length; i < 64; i++) {
                padded[i] = (byte) i;
            }
            keyBytes = padded;
        } else if (keyBytes.length > 64) {
            // Truncate if too long
            byte[] truncated = new byte[64];
            System.arraycopy(keyBytes, 0, truncated, 0, 64);
            keyBytes = truncated;
        }
        return Keys.hmacShaKeyFor(keyBytes);
    }

    // Generates a token with username as subject
    public String generateToken(User user) {
        return Jwts.builder()
                .setSubject(user.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(getSigningKey(), SignatureAlgorithm.HS512)
                .compact();
    }

    // validates token and return username if valid
    public String extractUsername(String token) {
        return Jwts.parser()
                .setSigningKey(getSigningKey())
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
}
