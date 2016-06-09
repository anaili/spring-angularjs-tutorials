'use strict'

angular.module('app').factory('auth', ['$http','$log','$location', function($http, $log, $location){
	
	return {
		login : login,
		logout : logout
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
		
		$http.post('/authenticate', requestParams, config)
			.success(function(data, status, headers, config) {
				successCallback();
			})
			.error(function(data, status, headers, config) {
				$log.error("Authentication failed");
				errorCallback();
			})
	}
	
	//logout function
	function logout(){
		
	}
}]);