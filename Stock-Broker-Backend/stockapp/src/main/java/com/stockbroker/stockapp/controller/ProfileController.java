package com.stockbroker.stockapp.controller;
// Show full user profile details

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stockbroker.stockapp.dao.UserDAO;
import com.stockbroker.stockapp.model.User;

//Get users profile info
@RestController
@RequestMapping("/profile")
public class ProfileController {
	
	@Autowired
	private UserDAO userDAO;
	
	// Fetch full profile of user by ID
	@GetMapping("/{userId}")
	public User getUserProfile(@PathVariable Long userId) {
		Optional<User> user = userDAO.findById(userId);
		return user.orElse(null);
	}

}
