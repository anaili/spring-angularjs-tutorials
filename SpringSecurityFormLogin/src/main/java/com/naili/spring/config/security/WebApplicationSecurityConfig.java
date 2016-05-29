package com.naili.spring.config.security;

import javax.inject.Inject;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class WebApplicationSecurityConfig extends WebSecurityConfigurerAdapter{

	@Inject AjaxAuthenticationSuccessHandler successHandler;
	
	@Inject AjaxAuthenticationFailureHandler failureHandler;
	
	@Inject UnauthorizedAuthenticationEntryPoint authenticationEntryPoint;
	
	@Inject AjaxLogoutSuccessHandler logoutSuccessHandler; 
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.inMemoryAuthentication()
			.withUser("user")
				.password("secret")
				.authorities("admin");
	}

	@Override
	public void configure(WebSecurity web) throws Exception {
		//ignore assets and static resources here.
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf()
			.disable()
			.formLogin()
				.loginProcessingUrl("/autenticate") //change this to something unpredictable.
				.successHandler(successHandler)
				.failureHandler(failureHandler)
				.permitAll()
			.and()
				.logout()
				.logoutUrl("/disconnect")
				.deleteCookies("JSESSIONID")
				.invalidateHttpSession(true)
				.logoutSuccessHandler(logoutSuccessHandler)
			.and()
				.exceptionHandling()
				.authenticationEntryPoint(authenticationEntryPoint);
	}

}
