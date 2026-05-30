package com.innov.dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;


@NoArgsConstructor  // generates no-arg constructor
@AllArgsConstructor // generates all-args constructor
public class LoginDto {
	
	private String username;
	
	public String getUsername() {
		return username;
	}

}
