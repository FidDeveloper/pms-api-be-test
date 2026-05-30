package com.innov.booking;

import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

@Configuration
public class AppStartupLogger {

    @Bean
    public ApplicationRunner logProfile(Environment env) {
        return args -> {
            System.out.println("=================================");
            System.out.println("Active Profiles: " + String.join(", ", env.getActiveProfiles()));
            System.out.println("=================================");
        };
    }
}