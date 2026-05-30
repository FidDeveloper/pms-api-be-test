package com.innov.service;

import org.springframework.beans.factory.annotation.Autowired;

import com.innov.model.Customer;
import com.innov.repository.ICustomerRepo;
import com.innov.booking.GeneralException;
import com.innov.constant.ErrorCode;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.innov.dto.AuthLoginResponseDto;
import com.innov.dto.AuthUserDto;
import com.innov.utility.JwtService;


@Service
public class AuthenticationService {
	
	@Autowired
	private ICustomerRepo customerRepo;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private JwtService jwtService;
	
	public AuthLoginResponseDto login(String identifier, String password) {
		Customer customer = findCustomerByIdentifier(identifier);
		
		if(customer == null) {
			throw new GeneralException(ErrorCode.USER_NOT_FOUND, "customer not found");
		}
		
		if (customer.getPasswordKey() == null || customer.getPasswordKey().isBlank()) {
			throw new GeneralException(ErrorCode.INVALID_INPUT, "Credentials not set up");
		}

		if(!passwordEncoder.matches(password, customer.getPasswordKey())) {
			throw new GeneralException(ErrorCode.INVALID_INPUT, "Wrong password");
		}

		String token = jwtService.generateToken(customer.getEmail());
		String refreshToken = jwtService.generateRefreshToken(customer.getEmail());

		AuthUserDto user = new AuthUserDto(
				customer.getLoginId(),
				customer.getUsername(),
				customer.getFullname(),
				customer.getEmail(),
				customer.getIcnumber(),
				customer.getDob()
		);

		return new AuthLoginResponseDto(user, token, refreshToken);
		
	}

	private Customer findCustomerByIdentifier(String identifier) {
		if (identifier == null || identifier.isBlank()) {
			return null;
		}

		Customer customer = customerRepo.findByEmail(identifier);
		if (customer != null) {
			return customer;
		}

		return customerRepo.findByUsername(identifier);
	}
	
	public Customer checkCustomerByToken(String token) {
		String email = jwtService.extractUsername(token);
		
		Customer customer = customerRepo.findByEmail(email);
		
		if(customer == null) {
			throw new GeneralException(ErrorCode.USER_NOT_FOUND, "customer not found");
		}
		
		return customer;
	}

}
