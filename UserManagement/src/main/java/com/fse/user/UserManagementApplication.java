package com.fse.user;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;

import com.fse.user.Filter.JWTFilter;



@SpringBootApplication
public class UserManagementApplication {

	@Bean
	public FilterRegistrationBean jwtFilterBean()
	{
		FilterRegistrationBean fb = new FilterRegistrationBean();
		fb.setFilter(new JWTFilter());
		fb.addUrlPatterns("/api/v1/*");
		return fb;
		
	}
	
	public static void main(String[] args) {
		SpringApplication.run(UserManagementApplication.class, args);
	}

}
