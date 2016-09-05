package com.naili.spring.config.security;

import java.security.Principal;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api")
public class PrincipalRestService {

	private Logger logger = LoggerFactory.getLogger(this.getClass().getName());
	
	@RequestMapping("realm")
	@ResponseBody
	public Principal getUser(HttpServletRequest request){
		if(request == null)
			logger.info("Request is null.");
		
		Principal p = request.getUserPrincipal();
		
		if(p!=null)
			logger.info(p.getName());
		else
			logger.info("Principal is null.");
		
		return p;
	}
	
	@RequestMapping("realm-new")
	@ResponseBody
	public Principal getPrincipal(Principal principal){
		return principal;
	}
	
}
