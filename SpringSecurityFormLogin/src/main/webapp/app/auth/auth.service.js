'use strict'

angular.module('app').factory('AuthenticationService',
		['$http','$log','$location','$rootScope', '$cookies',
		 function($http, $log, $location, $rootScope, $cookies){
	
	return {
		Login : login,
		Logout : logout,
		CreateSession : createLocalSession,
		InvalidateSession : invalidateLocalSession,
		GetSession : getSession
	};
	
	//login function
	function login(username, password, successCallback, errorCallback){
		
		var requestParams = $.param({
			username:username,
			password:password
		});
		
		var config = {
				headers:{'Content-Type': 'application/x-www-form-urlencoded'}
		};
		
		$http.post('/login', requestParams, config)
			.then(function(response) {
				$log.info(response.statusText);
				$log.info("Login succeeded :) ..."); 

				createLocalSession(username);

				//Invoke the successCallback function if it's defined.
				successCallback && successCallback();
			}, function(response) {
				$log.error("Authentication failed");
				errorCallback && errorCallback();
			});
	}
	
	//logout function
	function logout(successCallback){
		$http.post('/logout')
			.success(function(data, status, headers, config) {
				$log.info('Session logged out successfully.')
				
				invalidateLocalSession();
				successCallback && successCallback();
			});
	}
	
	function getSession(){
		return $http
				.get('/api/realm')
				.then(
					//successCallback
					function(response){
						$log.info("JSON response : "+JSON.stringify(response));
						$log.info("User "+response.data.name+" is already connected.")
						createLocalSession(response.data.name)
					},
					//errorCallback
					function(response) {
						$log.info("No active session found.");
						invalidateLocalSession()
					}
				);
	}
	
	function createLocalSession(username){
		$cookies.put("CONNECTED", true);
		$cookies.put("USER", username);
	}
	
	function invalidateLocalSession(){
		$cookies.remove("CONNECTED");
		$cookies.remove("USER");
	}
}]);

angular.module('app')
	   .factory('AuthenticationInterceptor',['$q','$log','$location', function($q, $log, $location){
		   	var authInterceptor = {
		   			responseError: responseError
		   	}
		   	
		   	function responseError(response){
		   		if(response.data.status == '401'){
		   			$log.info('HTTP Error 401 Intercepted. Maybe your session has been expired.')
					$location.path('/login').replace();
		   		}
		   		return $q.reject(response);
		   	}
		   	
		   	return authInterceptor;
	   }]);