package com.stockbroker.stockapp.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.stockbroker.stockapp.model.User;

//This interface gives CRUD operations for the User entity/table
@Repository  // Make this as a DAO component in Spring
public interface UserDAO extends JpaRepository<User, Long> 
// User: The entity it manages
// The type of the primary key
{

	// Custom query method: find user by username
    User findByUsername(String username);
    // findByUsername(String username) : Spring will auto-generate SQL
}
