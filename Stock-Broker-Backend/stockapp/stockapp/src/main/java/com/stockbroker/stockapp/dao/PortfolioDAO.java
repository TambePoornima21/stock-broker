package com.stockbroker.stockapp.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.stockbroker.stockapp.model.Portfolio;
import com.stockbroker.stockapp.model.User;

import java.util.List;

//Handles DB operations for Portfolio entity
@Repository
public interface PortfolioDAO extends JpaRepository<Portfolio, Long> {

	 // Get all portfolio entries for a specific user
	// findByUser(User user) : this method returns all stocks that the user has bought
    List<Portfolio> findByUser(User user);
}
