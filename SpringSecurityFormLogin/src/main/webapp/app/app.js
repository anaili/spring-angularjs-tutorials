//Initialize angular application module.
var app = angular.module('app', ['ngRoute']);

//Route params objects.
var notFoundRoute = { redirectTo: '/app/error/404.html' }
var defaultRoute = { redirectTo: '/home'};
var loginRoute = { controller: "LoginController", templateUrl: "/app/login/login.template.html" };
var homeRoute = { controller: "HomeController", templateUrl: "/app/home/home.template.html" };

//Configure routes.
app.config(['$routeProvider',function($routeProvider){
	 $routeProvider
	 	.when('/', defaultRoute)
	 	.when('/login', loginRoute)
		.when('/home', homeRoute)
		.otherwise(notFoundRoute);
}]);
