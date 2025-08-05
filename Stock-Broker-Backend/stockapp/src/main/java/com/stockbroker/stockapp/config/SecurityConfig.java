package com.stockbroker.stockapp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	
	//private final JwtAuthenticationFilter  jwtAuthFilter;

	//Allow public access to /auth/* endpoints
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
		http.csrf().disable() // Disable CSRF for simplicity
			.authorizeHttpRequests(auth -> auth
					.requestMatchers("/auth/**").permitAll() // open access
					.anyRequest().authenticated()// Secure other endpoints
					
			);
		return null;
			
}
}
