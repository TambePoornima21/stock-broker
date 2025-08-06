package com.stockbroker.stockapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stockbroker.stockapp.dao.UserDAO;
import com.stockbroker.stockapp.model.User;
import com.stockbroker.stockapp.service.JWTService;

// This controller manages login and registration routes
@CrossOrigin(origins = "*")
@RestController  //Creating backend services for frontend
@RequestMapping("/auth") //Sets a base URL path for all endpoints inside this class
public class AuthController {
	
	//Tells Spring to automatically inject these objects (dependencies) from the application context.
	@Autowired
	private UserDAO userDAO;
	
	@Autowired
	private JWTService jwtService;
	
	//Uses BCrypt to hash passwords before storing them.
	//This makes passwords secure — even if your database is leaked, passwords aren't in plain text.
	// For Password Hashing
	private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	
	// Register a new User
	@PostMapping("/register") // Handles HTTP POST requests to /auth/register
	// @RequestBody: Tells Spring to convert the JSON body of the request into a java object(User).
	public ResponseEntity<String> register(@RequestBody User user) {
		// This checks if user already exists
		if (userDAO.findByUsername(user.getUsername()) != null) {
			return ResponseEntity.badRequest().body("Username already exists");
		}
		// Hash the password before saving
		// Password use hashed using BCrypt
		// Saves the new user in the database
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		userDAO.save(user); //Save user to DB
		// Returns HTTP 200 OK with success message
		return ResponseEntity.ok("User registered successfully");
	}

	//Login endpoints {returns token if valid}
	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestBody User loginData) {
		// finds the user in the database using the provided username.
		User user = userDAO.findByUsername(loginData.getUsername());
		
		// Validate user and password
		// Verifies that the user exists and the hashed password matches the raw input.
		if (user != null && passwordEncoder.matches(loginData.getPassword(), user.getPassword())) {
			// if valid generates a JWT token and returns it.
			//Generate JWT token
			String token = jwtService.generateToken(user);
			return ResponseEntity.ok(token);
		}
		// if credentials are invalid, returns 401 Unauthorized.
		return ResponseEntity.status(401).body("Invalid username or password");
	}
}
