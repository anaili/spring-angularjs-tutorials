//Initialize angular application module.
var app = angular.module('app', ['ngRoute','ngCookies']);

//Route parameters objects.
var notFoundRoute = { redirectTo: '/app/error/404.html' }
var defaultRoute = { redirectTo: '/home'};
var loginRoute = { controller: "LoginController", templateUrl: "/app/login/login.template.html" };
var homeRoute = { controller: "HomeController", templateUrl: "/app/home/home.template.html" };

//application configuration.
app.config(['$routeProvider','$httpProvider', '$locationProvider',function($routeProvider, $httpProvider, $locationProvider){
	 //Configure routes.
	 $routeProvider
	 	.when('/', defaultRoute)
	 	.when('/login', loginRoute)
		.when('/home', homeRoute)
		.otherwise(notFoundRoute);
	 
	 //Register interceptors.
	 $httpProvider.interceptors.push('AuthenticationInterceptor');
	 
	 $locationProvider.html5Mode(true)
	 				  .hashPrefix('');
}]);

app.run(function($rootScope, $log, $location, $cookies, AuthenticationService) {
	
	$log.info("Getting session from server.");
	AuthenticationService.GetSession().then(function(){
		connected = $cookies.get('CONNECTED');
		$log.info("Connected : "+connected);
		
		if(connected==false || connected===undefined){
			$log.info("redirecting to login")
			$location.path('/login').replace();
		}
	});
	$(".dropdown-button").dropdown();
	
	
	
//	$rootScope.$on( "$locationChangeStart", function(event, newUrl) {
//		
//		if (!$rootScope.authenticated) {
//			$log.info('Unauthorized ... redirecting to login');
//			if(newUrl !== '/login')
//				$location.path('/login').replace();
//			$log.info(newUrl);
//		}
//	});
});
