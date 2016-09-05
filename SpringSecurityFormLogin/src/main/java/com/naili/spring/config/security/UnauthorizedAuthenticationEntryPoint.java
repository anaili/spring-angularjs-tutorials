package com.naili.spring.config.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

@Component
public class UnauthorizedAuthenticationEntryPoint implements AuthenticationEntryPoint{

	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException authException) throws IOException, ServletException {
		//By default spring redirect to login page. In our case we need only to get
		//a 401 HTTP error code to let angularjs take care of the authentication.
		
		response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
		//response.sendRedirect("/");
	}

}
