package com.innov.service;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.List;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.innov.repository.ICustomerRepo;
import com.innov.dto.CustomerDto;
import com.innov.model.Customer;
import com.innov.service.EmailService;
import com.innov.service.PasswordService;
import com.innov.booking.GeneralException;
import com.innov.constant.ErrorCode;

import jakarta.transaction.Transactional;

@Service
public class CustomerService {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(CustomerService.class);
	
	@Autowired
	private ICustomerRepo customerRepo; 
	
	@Autowired
	private EmailService emailService;
	
	@Autowired
	private PasswordService passwordService;
	
	
	
	public Customer validateCustomerRegistration (String fullname, String icnumber, String email, Date dob) {
		
		Customer customer = customerRepo.findByIcnumber(icnumber);
		
		if(customer == null) {
			customer = saveCustomer(fullname, icnumber, email, dob);
		}else {
			throw new GeneralException(ErrorCode.USER_ALREADY_EXISTS, "customer already exist");
		}
		
		return customer;
	}
	
	public Customer saveCustomer(String fullname, String icnumber, String email, Date dob) {
		Customer saveCustomer = new Customer();
		
		saveCustomer.setAll(fullname, icnumber, email, dob);
		return customerRepo.save(saveCustomer);
	}
	
	public int credentialSetup(String username, String ic, String email) {
		int credentialSaveResult = 2;
		
		try{
			Customer cust = customerRepo.findByUsername(username);
			
			if(cust == null) {
				List<String> passwordList = passwordService.generateEncodedPassword();
				credentialSaveResult = saveCredential(username, passwordList.get(0), ic);
				emailService.sendFirstCredentialHtml(email, "First Time Password", passwordList.get(1), username);
			}
		}catch(Exception e) {
			LOGGER.error(e.toString());
		}
		return credentialSaveResult;
	}
	
	/*0 - failed (customer didnt sign up yet)
	 *1 - succesfully save
	 *2 - Failed (username already exist)
	 **/
	public int saveCredential(String username, String password, String ic) {
		Customer cust = customerRepo.findByIcnumber(ic);
		int result = 0;
		if(cust != null) {
			cust.setUsername(username);
			cust.setPasswordKey(password);
			customerRepo.save(cust);
			result = 1;
		}
		
		return result;
	}
	
	/* 0 - success
	 * 1 - not found
	 * 2 - mismatch*/
	public Customer authenticate(String username, String password) {
		
		Customer customer = findByUsername(username);
		int result = 1;
		if(customer != null) {
			boolean isMatch = passwordService.checkPasswordMatch(password, customer.getPasswordKey());
			LOGGER.info("Encoded: "+customer.getPasswordKey());
			LOGGER.info("password: "+password);
			LOGGER.info("isMatch: "+isMatch);
			if(isMatch == false) {
				customer = null;
			}
		}
		
		return customer;
	}
	
	public int checkForgotPass(String username, String email) {
		int result = 0;
		
		try {
			
			Customer customer = findByUsernameAndEmail(username, email);
			
			if(customer != null) {
				LOGGER.info("customer: "+ customer.getFullname());
				result = Customer.CUSTOMER_EXIST;
				String resetLink = "http://localhost:3000/setupForgotPass/"+username+"/"+email;
				emailService.sendForgotPasswordlHtml(email, "Reset Password", username, resetLink);
			}else {
				result = Customer.CUSTOMER_NOT_EXIST;
			}
			
		}catch(Exception e) {
			result = Customer.ERROR_OCCUR;
		}
		
		return result;
	}
	

	public int forgotPassword(String password, String username, String email) {
		int result = 0;
		
		try {
			Customer customer = findByUsernameAndEmail(username, email);
			
			if(customer != null) {
				LOGGER.info("customer: "+ customer.getFullname());
				LOGGER.info("username: "+ username);
				LOGGER.info("email: "+ email);
				String passwordEncoded = passwordService.encodePassword(password);
				customer.setPasswordKey(passwordEncoded);
				customerRepo.save(customer);
				result = Customer.CUSTOMER_EXIST; 
			}else {
				result = Customer.CUSTOMER_NOT_EXIST;
			}
		}catch(Exception e) {
			LOGGER.error("error forgotPassword: {}", e.getMessage());
			result = Customer.ERROR_OCCUR;
		}
		return result;
	}
	
	public LocalDate convertDobFromIc(String icnumber) {
		int day = 0;
		int month = 0;
		int year = 0;
		
		year = Integer.parseInt(icnumber.substring(0, 2));
		month = Integer.parseInt(icnumber.substring(2, 4));
		day = Integer.parseInt(icnumber.substring(4, 6));
		
		if (year >= 0 && year <= 24) { // 00–24 = 2000–2024
		    year += 2000;
		} else {
		    year += 1900;
		}

		return LocalDate.of(year, month, day);
	}
	
	@Transactional
	public Customer saveCustomer(String fullname, String email, String icNumber, String username, String password, Customer customer) {
		
		try {
		
			if(fullname != null) {
				customer.setFullname(fullname);
			}
			if(email != null) {
				customer.setEmail(email);
			}
			if(icNumber != null) {
				customer.setIcnumber(icNumber);
				LocalDate localDate = convertDobFromIc(icNumber);
				Date date = Date.valueOf(localDate);
				customer.setDob(date);
			}
			if(username != null) {
				customer.setUsername(username);
			}
			if(password != null) {
				String passwordEncoded = passwordService.encodePassword(password);
				customer.setPasswordKey(passwordEncoded);
				LOGGER.info("password: {}", password);
				LOGGER.info("password encoded: {}", passwordEncoded);
			}
			LOGGER.info("customer: {}", customer.getFullname());
		}catch(Exception e) {
			LOGGER.error(e.getMessage());
		}
		
		return customer;
	}
	
	public Customer updateCustomer(String fullname, String icnumber, int userId) {
		Customer customer = customerRepo.findByLoginId(userId);
		
		if(customer == null) {
			throw new GeneralException(ErrorCode.USER_NOT_FOUND, "Update failed, user not found");
		}
		
		if(!(fullname == null || fullname.equals(""))) {
			customer.setFullname(fullname);
			LOGGER.info("change fullname");
		}
		
		if(!(icnumber == null || icnumber.equals(""))) {
			LocalDate localDate = convertDobFromIc(icnumber);
			Date date = Date.valueOf(localDate);
			customer.setIcnumber(icnumber);
			customer.setDob(date);
			LOGGER.info("change icnumber");
		}
		
		return customerRepo.save(customer);
	}
	
	public Customer findByUsername(String username) {
		Customer customer = customerRepo.findByUsername(username);
		return customer;
	}
	
	public Customer findByUsernameAndPasswordKey(String username, String password) {
		Customer customer = customerRepo.findByUsernameAndPasswordKey(username, password);
		return customer;
	}
	
	@Transactional
	public Customer findByUsernameAndEmail(String username, String email) {
	    return customerRepo.findByUsernameAndEmail(username, email);
	}
	
	public Customer findByEmail(String email) {
		Customer customer = customerRepo.findByEmail(email);
		return customer;
	}
	
}
