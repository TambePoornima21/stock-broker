
// This package provides utility or helper classes
// Database connection logic : useful if our event want to perform custom SQL queries

// it is optional that Only needed if we want to write raw SQL queries outside of JPA
package com.stockbroker.stockapp.utils;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

// Utitility class for manually managing JDBC database connections
public class DBUtil {

	private static final String jdbc_url = "jdbc:mysql://localhost:3306/stock_broker_app";
	private static final String jdbc_username = "root";
	private static final String jdbc_password = "atul";
	
	// This method return a database connection object
	public static Connection getConnection() throws SQLException{
		try {
			Class.forName("com.mysql.cj.jdbc.Driver"); // class load mysql JDBC driver
			return DriverManager.getConnection(jdbc_url, jdbc_username,jdbc_password);
		}
		catch(ClassNotFoundException e){
			throw new SQLException("MySQL JDBC Driver not found", e);
		}
	}
			
}
