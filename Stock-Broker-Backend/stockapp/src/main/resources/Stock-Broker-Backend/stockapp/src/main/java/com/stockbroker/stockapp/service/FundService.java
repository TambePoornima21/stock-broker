package com.stockbroker.stockapp.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.stockbroker.stockapp.dao.UserDAO;
import com.stockbroker.stockapp.model.User;

//this class will handles deposit and withdrawal for the users balance


// Business Logic related to user funds(deposit/withdraw)
@Service
public class FundService {

	@Autowired
	private UserDAO userDAO;
	
	//Deposit amount into users balance
	public boolean deposit(Long userId, double amount) {
		Optional<User> optional = userDAO.findById(userId);
		if(optional.isPresent()) {
			User user = optional.get();
			user.setBalance(user.getBalance() + amount); // it will Add Balance
			userDAO.save(user); // Save Updated user
			return true;
		}
		return false;
	}
	// Withdraw amount from user's balance
	public boolean withdraw(Long userId, double amount) {
		Optional<User> optional = userDAO.findById(userId);
		if(optional.isPresent()) {
			User user = optional.get();
			if(user.getBalance() >= amount) {
				user.setBalance(user.getBalance() - amount); // subtract from balance
				userDAO.save(user); // Save updated user
				return true;
			}
		}
		return false;
	}
	
	// check user balance;
	public double getBalance(Long userId) {
		Optional<User> optional = userDAO.findById(userId);
		return optional.map(User::getBalance).orElse(0.0);
	}
}
