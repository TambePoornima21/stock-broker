package com.stockbroker.stockapp.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity  // this annotations show that this class as a database entity
@Table(name = "users") //Specify the Table name in the database
public class User {
	
	@Id // defines Primary Key
	@GeneratedValue(strategy = GenerationType.IDENTITY) // auto-increments ID values
	private long id;
	
	@Column(nullable = false, unique= true) // defines the column in the table
	private String username;
	
	@Column(nullable = false)
	private String password;
	
	private String email;
	private String fullName;
	private String phone;
	
	// user current account balance
	private double balance;
	
	public User()
	{
		
	}
	
	public User(String username, String pass, String email, String phone, String fullName,double balance)
	{
		this.username = username;
		this.password = pass;
		this.email = email;
		this.phone = phone;
		this.fullName = fullName;
		this.balance = balance;
	}
	
	// Getters and Setters for private variables
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }
    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }
    public void setPhoneNo(String phone) {
        this.phone=phone;
    }
    public String getPhone() {
        return phone;
    }
	
	
}
