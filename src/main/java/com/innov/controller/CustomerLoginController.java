package com.innov.controller;

import java.util.HashMap;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.web.bind.annotation.RequestMethod;

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.http.HttpServletRequest;

import com.innov.constant.AppConstant;
import com.innov.constant.ErrorCode;
import com.innov.dto.LoginDto;
import com.innov.model.Customer;
import com.innov.repository.ICustomerRepo;
import com.innov.dto.CustomerDto;
import com.innov.service.CustomerService;
import com.innov.service.EmailService;
import com.innov.booking.GeneralException;
import com.innov.dto.GeneralResponse;

@RestController
@CrossOrigin(
	    origins = "http://localhost:3000",
	    allowedHeaders = "*",
	    methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS}
	)
@RequestMapping(AppConstant.API)
public class CustomerLoginController {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(CustomerLoginController.class);
	
	@Autowired
	private ICustomerRepo customerRepo;
	
	@Autowired
	private CustomerService customerService;
	
	//test
	@Autowired
	private EmailService emailService;


	@PostMapping( value = "/test2", consumes = AppConstant.APPLICATION_JSON, produces = AppConstant.APPLICATION_JSON)
	@ResponseBody
	public ResponseEntity<String> getAuthentication (HttpServletRequest request){
		ObjectMapper objectMapper = new ObjectMapper();
		LoginDto loginReq = null;
		Map<String, Object> response = new HashMap<>();
		String jsonResponse = null;
		
		try {
			loginReq = objectMapper.readValue(request.getReader(), LoginDto.class);
			
			String username = loginReq.getUsername();
			
			Customer login = customerRepo.findByUsername(username);
			
			if(login != null) {
				response.put("password", login.getPasswordKey());
			}else {
				response.put("password", "not found");
			}
			
			jsonResponse = handleJsonResponse(response);
		}catch(Exception e){
			response.put("result", "error");
			response.put("status", "0");
			jsonResponse = handleJsonResponse(response);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(jsonResponse);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(jsonResponse);
	}
	
	public String handleJsonResponse(Map<String, Object> response) {
		ObjectMapper objectMapper = new ObjectMapper();
		String jsonResponse = null;
		
		try {
			jsonResponse = objectMapper.writeValueAsString(response);
			
		}catch(Exception e){
			
		}
		
		return jsonResponse;
		
	}
	
	/*@PostMapping(value = "/test", consumes = "application/json", produces = "application/json")
	@ResponseBody
    public ResponseEntity<GeneralResponse> loginCustomer(@RequestBody CustomerDto customerDto) {
        Map<String, Object> response = new HashMap<>();
        
        Customer customer = customerService.findByUsernameAndPasswordKey(customerDto.getCustomerUsername(), customerDto.getCustomerPassword());
        
        if(customer == null) {
        	throw new GeneralException(ErrorCode.USER_NOT_FOUND, "user not exist");
        }else {
        	response.put("success", false);
        	response.put("result", "not exist");
        }
        
        return ResponseEntity.ok(jsonResponse);
    }*/
	
	
	@PostMapping(value = "/customerRegister", consumes = "application/json", produces = "application/json")
	@ResponseBody
	public ResponseEntity<GeneralResponse> registerCustomer(@RequestBody CustomerDto customerDto){

	
		Customer validateCustomer = customerService.validateCustomerRegistration(customerDto.getCustomerFullname(), customerDto.getCustomerIc(), customerDto.getCustomerEmail(), customerDto.getCustomerDOB());

		return ResponseEntity.ok(new GeneralResponse(true, "Customer addedd succefully", validateCustomer));
	}
	
	@PostMapping(value = "/credentialSetup", consumes = "application/json", produces="application/json")
	@ResponseBody
	public ResponseEntity<Map<String, Object>> setupCredential(@RequestBody CustomerDto customerDto){
		Map<String, Object> response = new HashMap<>();
		
		int credentialValidate = customerService.credentialSetup(customerDto.getCustomerUsername(), customerDto.getCustomerIc(), customerDto.getCustomerEmail());
		
		if(credentialValidate == 0) {
			response.put("success", false);
			response.put("reason", "Customer didnt sign up yet");
		}
		if(credentialValidate == 2) {
			response.put("success", false);
			response.put("reason", "username Already exist");
		}
		if(credentialValidate == 1) {
			response.put("success", true);
			response.put("reason", "Credential Successfully saved");
		}
		
		return ResponseEntity.ok(response);
		
	}
	
	
	//replace with httponly cookies
	@PostMapping(value = "/login", produces = "application/json", consumes = "application/json")
	@ResponseBody
	public ResponseEntity<GeneralResponse> authenticateLogin(@RequestBody CustomerDto customerDto){
		
		Map<String, Object> response = new HashMap<>();
		Boolean success = null;
		String message = "";
		
		Customer customer = customerService.authenticate(customerDto.getCustomerUsername(), customerDto.getCustomerPassword());
		
		if(customer == null) {
			success = false;
			message = "Failed login";
		}else {
			success = true;
			message = "User Login successfully";
		}
		
		return ResponseEntity.ok(new GeneralResponse(success, message, customer));
		
	}
	
	@PostMapping(value = AppConstant.API_USER_CHECK_FORGOT_PASSWORD)
	public ResponseEntity<GeneralResponse> checkForgotPassword(@RequestBody CustomerDto customerDto){
		
		Map<String, Object> response = new HashMap<>();
		Boolean success = null;
		String message = "";
		
		int result = customerService.checkForgotPass(customerDto.getCustomerUsername(), customerDto.getCustomerEmail());
		
		if(result == Customer.CUSTOMER_NOT_EXIST) {
			success = false;
			message = "Customer not exist";
		}else if(result == Customer.ERROR_OCCUR) {
			success = false;
			message = "Error occur, Fail to send email";		
		}else if(result == Customer.CUSTOMER_EXIST) {
			success = true;
			message = "Email has been sent";
		}
		
		return ResponseEntity.ok(new GeneralResponse(success, message));
	}
	
	@PostMapping(value = AppConstant.API_USER_FORGOT_PASSWORD, consumes = AppConstant.APPLICATION_JSON, produces = AppConstant.APPLICATION_JSON)
	@ResponseBody
	public ResponseEntity<GeneralResponse> forgotPassword(@RequestBody CustomerDto customerDto){
		Map<String, Object> response = new HashMap<>();
		Boolean success = null;
		String message = "";
		
		int result = customerService.forgotPassword(customerDto.getCustomerPassword(), customerDto.getCustomerUsername(), customerDto.getCustomerEmail());
		
		if(result == Customer.CUSTOMER_NOT_EXIST) {
			success = false;
			message = "Customer not exist";
		}else if(result == Customer.ERROR_OCCUR) {
			success = false;
			message = "Error occur";
		}else if(result == Customer.CUSTOMER_EXIST) {
			success = true;
			message = "Password successfully changed";
		}
		
		return ResponseEntity.ok(new GeneralResponse(success, message));
	}
	
	@GetMapping("/search")
	public String callTree() {
		
		String toEmail = "denielmustakim@gmail.com";
		String subject = "TEST";
		String body = "this is a test.";
		
		emailService.sendSimpleEmail(toEmail, subject, subject);
		
		return "OK";
	}
	
	@PatchMapping("/updateUser/{userId}")
	public ResponseEntity<GeneralResponse> updateUser(@PathVariable("userId") int userId, @RequestBody CustomerDto customerDto){
		Customer customer = customerService.updateCustomer(customerDto.getCustomerFullname(), customerDto.getCustomerIc(), userId);
		return ResponseEntity.ok(new GeneralResponse(true, "Customer update successfully", customer));
	}
	
	
}
