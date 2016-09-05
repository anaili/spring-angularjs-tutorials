angular.module('app')
	   .controller('HomeController',['AuthenticationService', '$rootScope', '$log', '$scope','$location', '$route', '$cookies',
                             function(AuthenticationService, $rootScope, $log, $scope, $location, $route, $cookies){
		   $scope.$parent.showNav = true;
		   $(".dropdown-button").dropdown();
		   $scope.message = "null";
		   $scope.username = $cookies.get('USER');
		   $scope.error = false;
		   $scope.logout = function(){
			   AuthenticationService.Logout(logoutSuccessCallback);
		   }
		   
		   function logoutSuccessCallback(){
			   $log.info('Logged out ... redirecting to login.');
			   $location.path('/login').replace();
		   }
	   }]);