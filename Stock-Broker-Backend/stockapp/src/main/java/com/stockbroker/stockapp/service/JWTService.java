package com.stockbroker.stockapp.service;


import java.util.Date;
import org.springframework.stereotype.Service;

import com.stockbroker.stockapp.model.User;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

//This JWTServices class is a utility in our spring boot backend that generates and
//validates JWT(JSON Web Tokens) for authentication. its commonly used in login systems
// to securely manage user sessions without using traditional server-side sessions


// Generates JWT tokens for Login
@Service
public class JWTService {
	
	// we can keep this secret somewhere safe
	private static final String SECRET_KEY = "Trading.and.Investing";
	private static final long EXPIRATION_TIME = 86400000; // 24hours
	
	
	// Generates a token with username as subject
	public String generateToken(User user) {
		return Jwts.builder()
				.setSubject(user.getUsername())
				.setIssuedAt(new Date())
				.setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
				.signWith(SignatureAlgorithm.HS512, SECRET_KEY)
				.compact();
	}

	// validates token and return username if valid
	public String extractUsername(String token) {
		return Jwts.parser()
				.setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
	}
}
