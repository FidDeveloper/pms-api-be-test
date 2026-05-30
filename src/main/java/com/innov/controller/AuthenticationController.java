package com.innov.controller;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.innov.dto.GeneralResponse;
import com.innov.dto.AuthenticationDto;
import com.innov.dto.AuthLoginResponseDto;
import com.innov.service.AuthenticationService;
import com.innov.model.Customer;
import com.innov.booking.GeneralException;
import com.innov.constant.ErrorCode;
import com.innov.utility.JwtService;
import jakarta.servlet.http.HttpServletRequest;
@RestController
@RequestMapping("/user/auth")
@CrossOrigin(
	    origins = "http://localhost:3000",
	    allowedHeaders = "*",
	    methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS}
	)
public class AuthenticationController {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(AuthenticationController.class);
	
	@Autowired
	private AuthenticationService authenticationService;

	@Autowired
	private JwtService jwtService;
	
	@PostMapping("/login")
	@ResponseBody
	public ResponseEntity<GeneralResponse> userLogin(@RequestBody AuthenticationDto request){
		String identifier = request.getEmail();
		if (identifier == null || identifier.isBlank()) {
			identifier = request.getUsername();
		}

		AuthLoginResponseDto authData = authenticationService.login(identifier, request.getPassword());
		
		return ResponseEntity.ok(new GeneralResponse(true, "Customer verified", authData));
	}
	
	@PostMapping("/checkUserToken")
	@ResponseBody
	public ResponseEntity<GeneralResponse> checkUsernameByToken(@RequestBody AuthenticationDto request){
		Customer customer  = authenticationService.checkCustomerByToken(request.getToken());
		LOGGER.info("customer: {}", customer.getEmail());
		return ResponseEntity.ok(new GeneralResponse(true, "customer found", customer));
	}

	@PostMapping("/logout")
	@ResponseBody
	public ResponseEntity<GeneralResponse> userLogout(HttpServletRequest request) {
		String authHeader = request.getHeader("Authorization");
		if (authHeader == null || !authHeader.startsWith("Bearer ")) {
			throw new GeneralException(ErrorCode.INVALID_INPUT, "Missing or invalid authorization header");
		}

		String token = authHeader.substring(7);
		jwtService.invalidateToken(token);

		return ResponseEntity.ok(new GeneralResponse(true, "User logged out successfully", null));
	}

}
