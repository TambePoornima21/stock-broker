package com.stockbroker.stockapp.controller;
// Deposit and withdraw money

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.stockbroker.stockapp.service.FundService;

// This class manages deposit and withdraw APIs
@RestController
@RequestMapping("/funds")
public class FundController {
	
	@Autowired
	private FundService fundService;
	
	//Deposit money to user account
	@PostMapping("/deposit")
	public ResponseEntity<String> deposit(@RequestParam Long userId, @RequestParam double amount) //@RequestParam :- Accepts userId and amount as query?form parameters 
	{
		boolean success = fundService.deposit(userId, amount);
		return success ? ResponseEntity.ok("Amount deposited successfully")
					   : ResponseEntity.badRequest().body("User not found");
	}
	
	// Withdraw money from user account
	@PostMapping("/withdraw")
	public ResponseEntity<String> withdraw(@RequestParam Long userId, @RequestParam double amount){
		boolean success = fundService.withdraw(userId, amount);
		return success ? ResponseEntity.ok("Amount Withdrawn successfully")
					   : ResponseEntity.badRequest().body("user not found or insufficient balance");			   
	}
	
	// Get current balance
	@GetMapping("/balance/{userId}") // URL contains user ID
	public double getbalance(@PathVariable Long userId) {
		return fundService.getBalance(userId);
	}

}
