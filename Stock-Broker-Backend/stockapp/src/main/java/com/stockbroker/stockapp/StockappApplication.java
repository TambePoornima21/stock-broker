package com.stockbroker.stockapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// Main Spring Boot app entry point
@SpringBootApplication // Enables component scanning, auto-config
public class StockappApplication {

	public static void main(String[] args) {
		// Launch the application
		SpringApplication.run(StockappApplication.class, args);
	}

}
