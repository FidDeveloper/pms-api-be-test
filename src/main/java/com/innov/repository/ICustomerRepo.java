package com.innov.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.innov.model.Customer;

public interface ICustomerRepo extends JpaRepository<Customer, Integer>{
	public Customer findByLoginId(int loginId);
	
	public Customer findByUsername(String username);
	
	public Customer findByEmail(String email);
	
	public Customer findByUsernameAndPasswordKey(String username, String passwordKey);

	public Customer findByIcnumber(String icnumber);
	
	public Customer findByUsernameAndIcnumber(String username, String icnumber);
	
	public Customer findByUsernameAndEmail(String username, String email);
}
