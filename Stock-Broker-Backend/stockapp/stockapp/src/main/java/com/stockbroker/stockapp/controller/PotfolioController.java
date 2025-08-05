package com.stockbroker.stockapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stockbroker.stockapp.dao.PortfolioDAO;
import com.stockbroker.stockapp.dao.UserDAO;
import com.stockbroker.stockapp.model.Portfolio;
import com.stockbroker.stockapp.model.User;

// Displays all stocks the user has bought

// This class handles users portfolio information
@RestController
@RequestMapping("/portfolio")
public class PotfolioController {

	// Used to fetch portfolio data(which stocks a user owns)
	@Autowired
	private PortfolioDAO  portfolioDAO;
	
	// Used to verify the user exists before fetching their portfolio
	@Autowired
	private UserDAO userDAO;
	
	// Get all stocks the user has bought
	@GetMapping("/{userId}")
	public List<Portfolio> getPortfolio(@PathVariable Long userId) //@PathVariable Long userId :- Maps the {userId} part of the URL to the method parameter
	{
		// Looks up the user in the database using userDAO
		// if not found, user is null
		User user = userDAO.findById(userId).orElse(null);
		
		// if user is found, use portfolioDAO.findByUser(user) to get all stocks they own
		// Otherwise , returns an empty list(List.of())
		return user != null ? portfolioDAO.findByUser(user) : List.of();
	}
}
