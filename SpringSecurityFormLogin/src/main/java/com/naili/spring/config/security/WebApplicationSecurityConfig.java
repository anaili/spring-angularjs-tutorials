package com.naili.spring.config.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class WebApplicationSecurityConfig extends WebSecurityConfigurerAdapter{

	@Autowired AjaxAuthenticationSuccessHandler successHandler;
	
	@Autowired AjaxAuthenticationFailureHandler failureHandler;
	
	@Autowired UnauthorizedAuthenticationEntryPoint authenticationEntryPoint;
	
	@Autowired AjaxLogoutSuccessHandler logoutSuccessHandler; 
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.inMemoryAuthentication()
			.withUser("user")
				.password("secret")
				.authorities("admin");
	}

	@Override
	public void configure(WebSecurity web) throws Exception {
		web
			.ignoring()
			.antMatchers("/")
			.antMatchers("/index.html")
			.antMatchers("/favicon.ico")
			.antMatchers("/bower_components/**")
			.antMatchers("/app/app.js")
			.antMatchers("/app/login/*")
			.antMatchers("/app/auth/*");
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf()
				.disable()
			.authorizeRequests()
				.anyRequest()
				.authenticated()
				.and()
			.formLogin()
				.loginProcessingUrl("/authenticate") //change this to something unpredictable.
				.usernameParameter("username")
				.passwordParameter("password")
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
