package com.innov.service;

import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.sql.Date;

import org.slf4j.Logger;

@Service
public class GeneralService {
	
	public static final Logger LOGGER = LoggerFactory.getLogger(GeneralService.class);
	
	public LocalDate convertStringToLocaldate(String stringDate) {
		LocalDate localDate = LocalDate.parse(stringDate);
		return localDate;
	}
	
	public Date convertLocaldateToSqlDate(LocalDate date) {
		Date sqlDate = Date.valueOf(date);
		return sqlDate;
	}

}
