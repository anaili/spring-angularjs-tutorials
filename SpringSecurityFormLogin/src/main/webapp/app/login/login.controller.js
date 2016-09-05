'use strict'

angular.module('app').controller(
		'LoginController',
		[
				'AuthenticationService', '$location', '$scope', '$window', '$route',
				function(AuthenticationService, $location, $scope, $window, $route) {
					$scope.loading = false;
					$scope.$parent.showNav = false;
					$scope.credentials = [];
					$scope.authError = false;
					$scope.credentials.email = '';
					$scope.credentials.password = '';
					$scope.credentials.submitAction = function() {
						$scope.loading = true;
						AuthenticationService.Login($scope.credentials.email, $scope.credentials.password, loginSuccess, loginError);
					}

					function loginSuccess() {
						$location.path('/home').replace();
						$scope.loading = false;
					}

					function loginError() {
						$scope.authError = true;
						$scope.loading = false;
					}
				}
		]
);