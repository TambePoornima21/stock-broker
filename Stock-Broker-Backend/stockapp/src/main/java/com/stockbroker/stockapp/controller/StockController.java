package com.stockbroker.stockapp.controller;
// Allows viewing stock list and placing buy orders.
//This controller plays a critical role in fetching real-time stock data and handling the stock buying process, interfacing with the service, dao, and model layers.

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.stockbroker.stockapp.dao.PortfolioDAO;
import com.stockbroker.stockapp.dao.TransactionDAO;
import com.stockbroker.stockapp.dao.UserDAO;
import com.stockbroker.stockapp.model.Portfolio;
import com.stockbroker.stockapp.model.Stock;
import com.stockbroker.stockapp.model.Transaction;
import com.stockbroker.stockapp.model.User;
import com.stockbroker.stockapp.service.StockService;

// Handles stock list and buy order requests
@RestController
@RequestMapping("/stocks")
public class StockController {

	//Provides stock data (likely from an external API or Manually added)
	@Autowired
	private StockService stockService;
	
	//Database access for User entity
	@Autowired
	private UserDAO userDAO;
	
	//Database access for user's owned stocks
	@Autowired
	private PortfolioDAO portfolioDAO;
	
	//Logs each stock buy transaction
	@Autowired
	private TransactionDAO transactionDAO;
	
	// Get list of all stocks from API
	// URL : GET /stocks
	// Returns: A list of all stocks (as JSON)
	// Calls the StockService to fetch the stock list — you can connect this to an external stock market API or a mock list.
	@GetMapping
	public List<Stock> getAllStocks() {
		return stockService.getALLStocks();
	}
	
	// Buy stock (symbol, quantity) for user
	// URL: POST /stocks/buy
	
	@PostMapping("/buy")
	public ResponseEntity<String> buyStock(@RequestParam Long userId, // ID of the user making the purchase
											@RequestParam String symbol, // Ticker(e.g,. tcs , rel, AAPL)
											@RequestParam String stockName, // Company name
											@RequestParam int quantity, // Number of shares
											@RequestParam double price) //Price per share
	{
		// Queries the database for a user with the given ID
		// If not found returns HTTP 400 Bad Request with a message
		Optional<User> optionalUser = userDAO.findById(userId);
		if(optionalUser.isEmpty()) {
			return ResponseEntity.badRequest().body("User not found");
		}
		
		// Calculates total price = quantity * price per share
		// Compares it with the users balance
		// If insufficient, responds with HTTP 400
		User user = optionalUser.get();
		double totalCost = price * quantity;
		
		if(user.getBalance() < totalCost) {
			return ResponseEntity.badRequest().body("Isufficient funds");
		}
		
		
		// Updates the users balance in memory
		// persists the change to the database using userDAO.
		// Deduct balance and save user
		user.setBalance(user.getBalance() - totalCost);
		userDAO.save(user);
		
		
		// Save to Portfolio
		// Creates a new portfolio entry showing the user now owns this stock
		// saves it to the database
		// Right now, it always adds a new entry. You might want to update existing stock in the portfolio instead of duplicating if the stock already exists.
		Portfolio portfolio = new Portfolio(user, symbol, stockName, quantity, price);
		portfolioDAO.save(portfolio);
		
		// Logs the transaction who bought what, how much, at what time, and whether it was successful
		// This is essential for audit history or order tracking
		// Save transaction
		Transaction transaction = new Transaction(user, symbol, quantity, price,"SUCCESS",LocalDateTime.now());
		transactionDAO.save(transaction);
		
		//Returns HTTP 200 OK and a confirmation message
		return ResponseEntity.ok("stock purchase successful");
	}
}
