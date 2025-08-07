// Service fetches real-time stock prices from an external API
package com.stockbroker.stockapp.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.stockbroker.stockapp.model.Stock;


// This class handles the logic of calling external stock APIs
@Service
public class StockService {

	// Replace this with actual stock price API endpoint
    private static final String API_URL = "https://api.example.com/stocks";  // <-- replace with real API
    
    private final RestTemplate restTemplate;
    
    // constructor injection of RestTemplate
    public StockService() {
    	this.restTemplate = new RestTemplate();
    }
    
    // Method to get list of stock objects from API
    public List<Stock> getALLStocks(){
    	try {
    		// we will be use stock data if API is unavailable
    		List<Stock> dummy = new ArrayList<>();
    		dummy.add(new Stock("AAPL","Apple Inc.",197.25));
    		dummy.add(new Stock("TCS","Tata Consultancy and Service",3521.30));
    		dummy.add(new Stock("GOOGL","Alphabet Inc.",2813.11));
    		return dummy;
    		
    		// Actual API usage if available:
            // ResponseEntity<Stock[]> response = restTemplate.getForEntity(API_URL, Stock[].class);
            // return Arrays.asList(response.getBody());
    	}catch(Exception e) {
    		e.printStackTrace();
    		return new ArrayList<>();
    	}
    }
}
