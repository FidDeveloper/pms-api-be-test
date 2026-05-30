package com.innov.service;

import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;

@Service
public class PasswordService {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(PasswordService.class);
	
	private static final String LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	private static final int PASSWORD_LENGTH = 10;
	private final SecureRandom random = new SecureRandom();
	private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	
	public List<String> generateEncodedPassword() {
		String randomGeneratedLetter = generateRandomPassword();
		LOGGER.info("Random generated password: "+ randomGeneratedLetter);
		String encodedRandomGeneratedLetter = encodePassword(randomGeneratedLetter);
		LOGGER.info("Encrupted Random generated password: "+ encodedRandomGeneratedLetter);
		
		List<String> passwordList = new ArrayList<>();
		
		passwordList.add(encodedRandomGeneratedLetter);
		passwordList.add(randomGeneratedLetter);
		
		return passwordList;
	}

    public String generateRandomPassword() {
        StringBuilder sb = new StringBuilder(PASSWORD_LENGTH);
        for (int i = 0; i < PASSWORD_LENGTH; i++) {
            sb.append(LETTERS.charAt(random.nextInt(LETTERS.length())));
        }
        return sb.toString();
    }
    
    public String encodePassword(String rawPassword) {
        return passwordEncoder.encode(rawPassword);
    }
    
    public boolean checkPasswordMatch(String normalPassword, String encodedPassword) {
    	
    	boolean isPasswordMatch = passwordEncoder.matches(normalPassword, encodedPassword);
    	
    	return isPasswordMatch;
    }
}
