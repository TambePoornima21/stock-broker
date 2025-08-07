package com.stockbroker.stockapp.utils;

import java.util.Date;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

// JWT utility method(JWTUtil.java) - a simplified helper around the JWTService
// This wraps token generation and validation logic JWTSerice. Useful when using JWT in controllers

public class JWTUtil {

	private static final String SECRET_KEY = "Trading.and.Investing";
	private static final long EXPIRATION_TIME = 86400000;
	
	//Generate token from username
	public String generateToken(String username) {
		return Jwts.builder()
				.setSubject(username) // store username
				.setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))  // expiry
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)  // signing method
                .compact();  // final token
	}
	
	// Extract username  from token
	public String extractUsername(String token) {
		return getClaims(token).getSubject();
	}
	
	// validate token (check expiry and signature)
	public boolean validateToken(String token) {
		try {
			getClaims(token);
			return true;
		}catch(JwtException e) {
			return false;
		}
	}
	
	// Get claims (payload data) from JWT
	// in JWT claims are pieces of information stored inside the token payload. 
	//These claims represent data about the user or token and are used to communicate between 
	//the client and server securely.
	private Claims getClaims(String token) {
		return Jwts.parser()
				.setSigningKey(SECRET_KEY)  // same as in generate
				.parseClaimsJws(token)
				.getBody();
	}
}
