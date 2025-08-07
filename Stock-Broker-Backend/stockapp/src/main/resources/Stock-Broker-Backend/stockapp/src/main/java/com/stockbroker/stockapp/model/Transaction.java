package com.stockbroker.stockapp.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "transactions")
public class Transaction {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	// Link to user
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String stockSymbol;
    private int quantity;
    private double price;
    private String status;  // e.g., "SUCCESS" or "FAILED"

    private LocalDateTime transactionTime;
    public Transaction() {
    }

    public Transaction(User user, String stockSymbol, int quantity, double price, String status, LocalDateTime transactionTime) {
        this.user = user;
        this.stockSymbol = stockSymbol;
        this.quantity = quantity;
        this.price = price;
        this.status = status;
        this.transactionTime = transactionTime;
    }

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getStockSymbol() {
		return stockSymbol;
	}

	public void setStockSymbol(String stockSymbol) {
		this.stockSymbol = stockSymbol;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public LocalDateTime getTransactionTime() {
		return transactionTime;
	}

	public void setTransactionTime(LocalDateTime transactionTime) {
		this.transactionTime = transactionTime;
	}
}
