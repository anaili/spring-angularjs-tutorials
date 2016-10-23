package com.naili;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
public class SpringSecurityBasicAuthApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringSecurityBasicAuthApplication.class, args);
	}
}
