package com.innov.booking;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = {"com.innov.service", "com.innov.controller", "com.innov.dto", "com.innov.constant", "com.innov.booking", "com.innov.utility", "com.innov.config"})
@EnableJpaRepositories(basePackages = "com.innov.repository")
@EntityScan(basePackages = "com.innov.model")
public class BookingApplication {
	public static void main(String[] args) {
		SpringApplication.run(BookingApplication.class, args);
	}
}
