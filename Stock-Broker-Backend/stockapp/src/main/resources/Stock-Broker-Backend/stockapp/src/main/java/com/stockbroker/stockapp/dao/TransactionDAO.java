package com.stockbroker.stockapp.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.stockbroker.stockapp.model.User;
import com.stockbroker.stockapp.model.Transaction;

import java.util.List;

//Handles transactions like buy/sell stock
@Repository
public interface TransactionDAO extends JpaRepository<Transaction, Long>{

	// Find all transactions of a user
	// Fetches all stock transaction made by the user
	// stock purchase history
    List<Transaction> findByUser(User user);
}
