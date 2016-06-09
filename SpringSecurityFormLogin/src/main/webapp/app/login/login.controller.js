'use strict'

angular.module('app').controller(
		'LoginController',
		[
				'auth', '$location', '$scope',
				function(auth, $location, $scope) {
					$scope.credentials = [];
					$scope.authError = false;
					$scope.credentials.username = '';
					$scope.credentials.password = '';
					$scope.credentials.submitAction = function() {
						auth.login($scope.credentials.username, $scope.credentials.password, loginSuccess, loginError);
					}

					function loginSuccess() {
						$location.path('/home');
					}

					function loginError() {
						$scope.authError = true;
					}
				}
		]
);